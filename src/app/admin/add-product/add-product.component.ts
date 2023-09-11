import { Component, OnInit } from '@angular/core';
import { Product } from '../model/Product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pair } from '../model/Pair';
import { ActivatedRoute, Params } from '@angular/router';
import { ShopServiceService } from 'src/app/services/shop-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

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
  category: string = ''

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


    this.productForm = this.fb.group({
      productTitle: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      colour: ['', [Validators.required]],
      usage: ['', [Validators.required]],
      productType: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      productImage: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
    });
  }

  getKeyByValue(object: Pair, value: string) {
    return Object.keys(object).find((key) =>
      object[key as keyof Pair].includes(value)
    );
  }





  ngOnInit(): void {

    this.service.getPairs().subscribe((data) => {
      this.pairs = data;
      console.log('get pairs')
      console.log(this.getKeyByValue(this.pairs, 'Sandals'));
      console.log(typeof (this.getKeyByValue(this.pairs, 'Sandals')))

    },

      (error) => {
        Swal.fire(
          'Error occured !' + error.statusText,
          'We are sorry',
          'warning'
        );
      }
    );

    this.ProdOptions();


  }

  ProdOptions() {

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
    this.params.gender = elementId
    console.log(this.params)
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



  onSubmit(form: FormGroup) {
    this.dataForm.append('productTitle', form.value.productTitle);
    this.dataForm.append('colour', form.value.colour);
    this.dataForm.append('usage', form.value.usage);
    this.dataForm.append('productType', form.value.productType);
    this.dataForm.append('imageUrl', form.value.imageUrl);
    this.dataForm.append('quantity', form.value.quantity);
    this.dataForm.append('price', form.value.price);
    this.dataForm.append('gender', form.value.gender);
    this.dataForm.append('category', this.category);
    this.dataForm.append('subCategory', this.getKeyByValue(this.pairs, form.value.productType) as string);

    console.log('dataForm');
    console.log(this.dataForm);
    console.log(form.value.productTitle)

    this.service.addProduct(this.dataForm)
      .subscribe((data) => {
        console.log(data);
        Swal.fire(
          'You have successfully add product!' + data.productTitle,
          'success'
        );
      },
        (error) => {
          console.log(error);
          Swal.fire(
            'Error occured !' + error.statusText + '. Check if the product with this title exists! If exists change product title!',
            'We are sorry',
            'warning'
          );
        }

      );
  }


}
