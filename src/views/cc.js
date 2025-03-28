 export const constantRoutes = {
  'type': 'group',
  'logic': '&&',
  'children': [
    {
      'leftParam': {
        'args': [],
        'type': 'Variable',
        'dataType': 'String',
        'value': 'cust_name',
        '_show': true,
        'subtype': 'Input',
        'detail': '客户姓名'
      },
      'operation': 'isNotEqualTo',
      'rightParam': {
        'args': [],
        'type': 'Variable',
        'value': 'sex',
        'dataType': 'String',
        '_show': true,
        'subtype': 'Input',
        'detail': '性别'
      }
    },
    {
      'type': 'group',
      'logic': '&&',
      'children': [
        {
          'leftParam': {
            'args': [],
            'type': 'Variable',
            'dataType': 'String',
            'value': 'sex',
            '_show': true,
            'subtype': 'Input',
            'detail': '性别'
          },
          'operation': 'isNotEqualTo',
          'rightParam': {
            'args': [],
            'type': 'Variable',
            'value': 'cust_name',
            'dataType': 'String',
            '_show': true,
            'subtype': 'Input',
            'detail': '客户姓名'
          }
        },
        {
          'leftParam': {
            'args': [],
            'type': 'Variable',
            'dataType': 'String',
            'value': 'nationality',
            '_show': true,
            'subtype': 'Input',
            'detail': '国籍'
          },
          'operation': 'isNotEqualTo',
          'rightParam': {
            'args': [],
            'type': 'Variable',
            'value': 'cust_name',
            'dataType': 'String',
            '_show': true,
            'subtype': 'Input',
            'detail': '客户姓名'
          }
        }
      ]
    }
  ]
}
export const group ={
  logic: '&&',
  children: [
    {
      comp:   {
        'leftParam': {
          'args': [],
          'type': 'Variable',
          'dataType': 'String',
          'value': 'cust_name',
          'subtype': 'Input',
          'detail': '客户姓名'
        },
        'operation': 'isNotEqualTo',
        'rightParam': {
          'args': [],
          'type': 'Variable',
          'value': 'sex',
          'dataType': 'String',
          'subtype': 'Input',
          'detail': '性别'
        }
      },
    },
    {
      gropup:   {
        'logic': '&&',
        'children': [
          {
            comp:{
              'leftParam': {
                'args': [],
                'type': 'Variable',
                'dataType': 'String',
                'value': 'sex',
                'subtype': 'Input',
                'detail': '性别'
              },
              'operation': 'isNotEqualTo',
              'rightParam': {
                'args': [],
                'type': 'Variable',
                'value': 'cust_name',
                'dataType': 'String',
                'subtype': 'Input',
                'detail': '客户姓名'
              }
            }
          },
           {
            comp:{
              'leftParam': {
                'args': [],
                'type': 'Variable',
                'dataType': 'String',
                'value': 'nationality',
                'subtype': 'Input',
                'detail': '国籍'
              },
              'operation': 'isNotEqualTo',
              'rightParam': {
                'args': [],
                'type': 'Variable',
                'value': 'cust_name',
                'dataType': 'String',
                'subtype': 'Input',
                'detail': '客户姓名'
              }
            }
          }
        ]
      }
    }

  ]
}