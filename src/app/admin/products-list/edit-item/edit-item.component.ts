import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ShopServiceService } from 'src/app/services/shop-service.service';
import { Product } from '../../model/Product';
import { Pair } from '../../model/Pair';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})
export class EditItemComponent implements OnInit {
  chosenProduct: Product;
  category: string = 'apparel'
  productItem = {};
  Colours: string[] = [];
  SubCategory: string[] = [];
  ProductType: string[] = [];
  Usage: string[] = [];
  ProductListAll: Product[] = [];
  pairs: Pair = new Pair();
  dataForm = new FormData();
  isBoys: boolean = false;
  isGirls: boolean = false;
  isMen: boolean = false;
  isWomen: boolean = false;
  productForm: FormGroup;
  //imageForm:FormGroup;

  testData: FormData = new FormData();

  params = {
    ordering: 'colour',
    gender: 'boys',
    p: 1,
    productType: '',
    subCategory: '',
    colour: '',
    usage: '',
  };
  constructor(
    private service: ShopServiceService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.chosenProduct = new Product();

    this.productForm = this.fb.group({
      productTitle: '',
      gender: '',
      colour: '',
      usage: '',
      productType: '',
      imageUrl: '',
      productImage: '',
      price: '',
      quantity: '',
    });
  }

  getKeyByValue(object: Pair, value: string) {
    return Object.keys(object).find((key) =>
      object[key as keyof Pair].includes(value)
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log(params['id']);

      this.service.getProduct(params['id']).subscribe((data) => {
        this.chosenProduct = data;
        console.log(this.chosenProduct)
        if (this.chosenProduct.gender.toLowerCase() == 'boys') {
          this.isBoys = true;
        }
        if (this.chosenProduct.gender.toLowerCase() == 'girls') {
          this.isGirls = true;
        }
        if (this.chosenProduct.gender.toLowerCase() == 'men') {
          this.isMen = true;
        }
        if (this.chosenProduct.gender.toLowerCase() == 'women') {
          this.isWomen = true;
        }
        this.productForm.patchValue(this.chosenProduct);
      });


    });
    this.service.getPairs().subscribe((data) => {
      console.log('pairs')
      this.pairs = data;
      console.log(this.getKeyByValue(this.pairs, 'Sandals'));
    },
      (error) => {
        Swal.fire(
          'Error occured !' + error.statusText,
          'We are sorry',
          'warning'
        );
      }
    );
    this.params.gender = this.chosenProduct.gender;
    this.ProdOptions();

  }

  ProdOptions() {
    console.log('parametri u ProdListAll');

    console.log(this.params);
    this.service.getProdListNew(this.params).subscribe((data) => {
      this.ProductListAll = data.products;
      let tempC = this.ProductListAll.map((elem) => elem.colour);
      this.Colours = tempC.filter(
        (value, index, array) => array.indexOf(value) === index
      );
      let tempS = this.ProductListAll.map((elem) => elem.subCategory);
      this.SubCategory = tempS.filter(
        (value, index, array) => array.indexOf(value) === index
      );
      let tempP = this.ProductListAll.map((elem) => elem.productType);
      this.ProductType = tempP.filter(
        (value, index, array) => array.indexOf(value) === index
      );
      let tempU = this.ProductListAll.map((elem) => elem.usage);
      this.Usage = tempU.filter(
        (value, index, array) => array.indexOf(value) === index
      );
    });
  }

  changeGender(event: Event): void {
    let elementId: string = (event.target as Element).id;
    console.log('gender:');
    console.log(event);
    console.log(elementId);
    this.params.gender = elementId;
    if (elementId == 'boys' || elementId == 'girls') {
      this.category = 'apparel'
    } else {
      this.category = 'footwear'
    }

    this.ProdOptions();
  }



  getSelectedValue(event: any, select: string) {
    if (select == 'colour') {
      console.log('update parametri');
      console.log(event.target.value);
    }
    if (select == 'subCategory') {
    }
    if (select == 'productType') {
    }
    if (select == 'usage') {
    }
  }

  onChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productForm.controls['productImage'].setValue(file);
      this.dataForm.append('productImage', file);
    }
  }

  deleteProduct() {
    console.log('delete')
    console.log(this.chosenProduct.id)
    this.service
      .deleteProduct(this.chosenProduct.id)
      .subscribe((data) => {
        Swal.fire(
          {
            'text': 'You have successfully deleted product!' + data.productTitle,
            'icon': 'success'
          }
        );
      },
        (error) => {
          Swal.fire(
            'Error occured !' + error.statusText,
            'We are sorry',
            'warning'
          );
        }
      );

  }

  onSubmit(form: FormGroup) {
    this.dataForm.append('productTitle', form.value.productTitle);
    this.dataForm.append('colour', form.value.colour);
    this.dataForm.append('usage', form.value.usage);
    this.dataForm.append('productType', form.value.productType);
    this.dataForm.append('imageUrl', form.value.imageUrl);
    this.dataForm.append('quantity', form.value.quantity);
    this.dataForm.append('price', form.value.price);
    this.dataForm.append('gender', form.value.gender.toLowerCase()); //form.value.gender
    this.dataForm.append('category', this.category);
    this.dataForm.append('subCategory', this.getKeyByValue(this.pairs, form.value.productType) as string);
    //this.dataForm.append('subCategory',this.getKeyByValue(this.pairs, form.value.productType)ing())

    console.log('dataForm');
    console.log(this.dataForm);

    this.service.editProduct(this.dataForm, this.chosenProduct.id)
      .subscribe((data) => {
        console.log(data);

        Swal.fire({
          'text': 'You have successfully changed product!' + data.productTitle,
          'icon': 'success'
        }
        );
      },
        (error) => {
          Swal.fire(
            'Error occured !' + error.statusText,
            'We are sorry',
            'warning'
          );
        }

      );
  }
}
