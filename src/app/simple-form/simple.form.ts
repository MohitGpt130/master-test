import {
  createMatConfig,
  DynMatRadioParams,
  DynMatSelectParams,
} from '@myndpm/dyn-forms/ui-material';
import { DynFormConfig } from '@myndpm/dyn-forms';

export const simpleData = {
  billing: {
    firstName: 'Mynd',
    lastName: 'Management',
    address1: '1611 Telegraph Ave',
    address2: 'Suite 1200',
    country: 'US',
    zipCode: '94612',
  },
  account: 'GUEST',
  products: [
    {
      product: 'Product 1',
      quantity: 8,
    },
    {
      product: 'Product 2',
      quantity: 4,
    },
  ]
};

function getMachineData(){
 var dropDownOptions = [{text: '- Choose one -', value: null}];
  fetch('https://capl91gn.smartfactoryworx.tech/api/manual/equipment/5ecc8663c4100a70cc4a8d08?type=machine').then((response)=>
   response.json()
  ).then((data: any)=>{
    console.log(data);
    data.forEach(elm => {
      dropDownOptions.push({text: elm.display_name, value: elm._id})
    });
  })

  return dropDownOptions;
}

export const simpleForm: DynFormConfig<'edit'|'display'> = { // typed mode
  modeParams: {
    edit: { readonly: false },
    display: { readonly: true },
  },
  controls: [
    createMatConfig('CARD', {
      name: 'operator',
      factory: { cssClass: 'row' },
      params: {
        title: 'Add Operator',
        subtitle: 'Please fill the required fields',
      },
      controls: [
        createMatConfig('INPUT', {
          name: 'operatorEntryname',
          options: { validators: ['required'] },
          factory: { cssClass: 'col-sm-6 col-md-4' },
          params: { label: 'Operator Name *' },
        }),
        createMatConfig('INPUT', {
          name: 'operatorEntryid',
          // options: { validators: ['required'] },
          factory: { cssClass: 'col-sm6' },
          params: { invisible : true},

        }),
        createMatConfig('INPUT', {
          name: 'operatorEntrycode',
          options: { validators: null },
          factory: { cssClass: 'col-sm-6 col-md-4' },
          params: { label: 'Operator Code *' },
        }),
        createMatConfig('DIVIDER', {
          params: { invisible: true },
        }),
        createMatConfig('INPUT', {
          name: 'operatorEntrydisplayName',
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


export const simpleForm2: DynFormConfig<'edit'|'display'> = { // typed mode
  modeParams: {
    edit: { readonly: false },
    display: { readonly: true },
  },
  controls: [
    createMatConfig('CARD', {
      name: 'fault',
      factory: { cssClass: 'row' },
      params: {
        title: 'Add Fault',
        subtitle: 'Please fill the required fields',
      },
      controls: [
        // createMatConfig('INPUT', {
        //   name: 'operatorEntryname',
        //   options: { validators: ['required'] },
        //   factory: { cssClass: 'col-sm-6 col-md-4' },
        //   params: { label: 'Operator Name *' },
        // }),
        // createMatConfig('INPUT', {
        //   name: 'operatorEntryid',
        //   // options: { validators: ['required'] },
        //   // factory: { cssClass: 'col-sm-6 col-md-4' },
        //   params: { invisible : true},

        // }),
        // createMatConfig('INPUT', {
        //   name: 'operatorEntrycode',
        //   options: { validators: null },
        //   factory: { cssClass: 'col-sm-6 col-md-4' },
        //   params: { label: 'Operator Code *' },
        // }),
        // createMatConfig('DIVIDER', {
        //   params: { invisible: true },
        // }),



        createMatConfig('SELECT', {
          name: 'operatorEntryorigin',
          options: {
            defaults: 'CO',
            // validators: ['required'],
          },
          factory: { cssClass: 'col-12 col-md-8' },
          params: {
            label: 'Select Machine',
            options: getMachineData(),
          },
          modes: {
            display: {
              control: 'INPUT',
              paramFns: { getValue: 'getOptionText' }
            },
          },
        }),
        createMatConfig('DIVIDER', {
          params: { invisible: true },
        }),
        createMatConfig('INPUT', {
          name: 'operatorEntrydisplayName',
          options: { validators: ['required'] },
          factory: { cssClass: 'col-12 col-md-8' },
          params: { label: 'Fault Description *' },
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
