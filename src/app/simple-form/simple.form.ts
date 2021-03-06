import {
  createMatConfig,
  DynMatRadioParams,
  DynMatSelectParams,
} from '@myndpm/dyn-forms/ui-material';
import { DynFormConfig } from '@myndpm/dyn-forms';


export const PostOperatorApi = 'https://capl91gn.smartfactoryworx.tech/api/manual/postoperator';

function getOperatorData(){
  var operatorData = [];
   fetch('https://capl91gn.smartfactoryworx.tech/api/manual/getoperator?origin=all').then((response)=>
    response.json()
   ).then((data: any)=>{
     console.log(data);
      data.forEach((e)=> delete e.__v && delete e.createdAt && delete e.updatedAt);
     console.log(data);
     data.forEach(elm => {
      operatorData.push(elm);
     });
   })

   return operatorData;
 }

export const operatorData = getOperatorData();



export const operatorInterface = {
    code: { 'DN': 'Code', 'visible': false },
    display_name: { 'DN': 'Display Name', 'visible': false },
    operator_name: { 'DN': 'Name', 'visible': false },
    _id: { 'DN': 'Operator ID', 'visible': true },
    operatorEntryorigin: { 'DN': 'Origin', 'visible': true },

  }
export const operatorForm: DynFormConfig<'edit'|'display'> = { // typed mode
  modeParams: {
    edit: { readonly: false },
    display: { readonly: true },
  },
  controls: [
    createMatConfig('CARD', {
      name: 'data',
      factory: { cssClass: 'row' },
      params: {
        title: 'Add Operator',
        subtitle: 'Please fill the required fields',
      },
      controls: [
        createMatConfig('INPUT', {
          name: 'operator_name',
          options: { validators: ['required'] },
          factory: { cssClass: 'col-sm-6 col-md-4' },
          params: { label: 'Operator Name *' },
        }),
        createMatConfig('INPUT', {
          name: '_id',
          // options: { validators: ['required'] },
          factory: { cssClass: 'col-sm6' },
          params: {label: 'Operator Id' ,invisible : true},

        }),
        createMatConfig('INPUT', {
          name: 'code',
          options: { validators: null },
          factory: { cssClass: 'col-sm-6 col-md-4' },
          params: { label: 'Operator Code *' },
        }),
        createMatConfig('DIVIDER', {
          params: { invisible: true },
        }),
        createMatConfig('INPUT', {
          name: 'display_name',
          options: { validators: ['required'] },
          factory: { cssClass: 'col-12 col-md-8' },
          params: { label: 'Display Name *' },
        }),

        createMatConfig('DIVIDER', {
          params: { invisible: true },
        }),
        createMatConfig('SELECT', {
          name: 'operatorEntryorigin',
          options: {
            defaults: 'CO',
            // validators: ['required'],
          },
          factory: { cssClass: 'col-sm-6 col-md-4' },
          params: {
            label: 'Origin',
            options: [{text: '- Choose one -', value: undefined}, {text: 'Contract', value: 'contract'}, {text: 'Permanent', value: 'Permanent'}],
          },
          modes: {
            display: {
              control: 'INPUT',
              paramFns: { getValue: 'getOptionText' }
            },
          },
        }),
        // createMatConfig('INPUT', {
        //   name: 'zipCode',
        //   options: {
        //     matchers: [
        //       {
        //         matcher: 'ENABLE',
        //         negate: true,
        //         operator: 'AND',
        //         when: [
        //           { path: 'firstName', value: 'Mateo' },
        //           { path: 'country', value: 'CO' },
        //         ]
        //       },
        //       {
        //         matcher: 'HIDE',
        //         when: [
        //           { path: 'account', value: 'GUEST' },
        //         ]
        //       },
        //     ]
        //   },
        //   factory: { cssClass: 'col-sm-6 col-md-4' },
        //   params: { label: 'Postal Code' },
        // }),
      ],
    }),
    // createMatConfig('BUTTON', {
    //   name: 'account',
    //   params: {
    //     options: [
    //       { text: 'Create Account', value: 'CREATE' },
    //       { text: 'Checkout as a Guest', value: 'GUEST' },
    //     ],
    //   },
    //   modes: {
    //     display: {
    //       control: 'INPUT',
    //       paramFns: { getValue: 'getOptionText' }
    //     },
    //   },
    // }),
    // createMatConfig('ARRAY', {
    //   name: 'products',
    //   factory: { cssClass: 'row' },
    //   params: {
    //     title: 'Products',
    //     subtitle: 'Items to checkout',
    //     initItem: true,
    //   },
    //   controls: [
    //     createMatConfig('INPUT', {
    //       name: 'product',
    //       options: { validators: ['required'] },
    //       factory: { cssClass: 'col-6 col-md-8' },
    //       params: { label: 'Product Name *' },
    //     }),
    //     createMatConfig('INPUT', {
    //       name: 'quantity',
    //       options: { validators: ['required', ['min', 1]] },
    //       factory: { cssClass: 'col-5 col-md-3' },
    //       params: { label: 'Quantity *', type: 'number' },
    //     }),
    //   ],
    // }),
  ],
};



