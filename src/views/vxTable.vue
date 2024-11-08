<template>
  <div>
    <vxe-table
            border
            resizable:true
            :scroll-y="{enabled: false}"
            :span-method="mergeRowMethod"
            :data="tableData3">
            <vxe-colgroup title="key-num"  header-class-name="hidden-cell" align="center">
              <vxe-column field="key" ></vxe-column>
              <vxe-column field="num" ></vxe-column>
            </vxe-colgroup>
            <vxe-column field="id" title="id" ></vxe-column>
            <vxe-column field="content" title="Translate"></vxe-column>
            <vxe-column field="language" title="Language" :filters="[{label: '中文', value: 'zh_CN' }, {label: 'English', value: 'en_US'}]"></vxe-column>
      </vxe-table>
  </div>
  </template>
  <script> 
  export default {
            data () {
              return {
                tableData3: [
                  { key: 'app.label.name', id: 10001, num:'1', content: '名称', language: 'zh_CN' },
                  { key: 'app.label.name', id: 10001, num:'1', content: 'Name', language: 'en_US' },
                  { key: 'app.label.name',id: 10003, num:'1', content: '性别', language: 'zh_CN' },
                  { key: 'app.label.name',id: 10004,  num:'1',content: 'Sex', language: 'en_US' },
                  { key: 'app.label.age',id: 10004, num:'1',  content: '年龄', language: 'zh_CN' },
                  { key: 'app.label.age',id: 10006,  num:'1',content: 'Age', language: 'en_US' },
                  { key: 'app.label.role',id: 10007,  num:'1',content: '角色', language: 'zh_CN' },
                  { key: 'app.label.role',id: 10008,  num:'1',content: 'Role', language: 'en_US' },
                  { key: 'app.label.address',id: 10009, num:'1', content: '地址', language: 'zh_CN' },
                  { key: 'app.label.address',id: 10010,  num:'1',content: 'Address', language: 'en_US' },
                  { key: 'app.label.nickname', id: 10011,  num:'1',content: '昵称', language: 'zh_CN' },
                  { key: 'app.label.nickname',id: 10012,  num:'1',content: 'Nickname', language: 'en_US' }
                ],
                keys:[],
              }
            },
            created(){
              this.mergeBt();
              this.allProp();
            },
            methods: {
              //获取所有需要合并的属性
              allProp(){
                for(let i in this.tableData3[0]){
                  this.keys.push(i);
                }   
                console.log(this.keys);
              },
              // 通用行合并函数（将相同多列数据合并为一行）
              mergeRowMethod ({ row, _rowIndex, column, visibleData }) {
                const fields = this.keys;     
                const cellValue = row[column.property];
                for(let j=0;j<fields.length;j++){
                  if (cellValue && fields[j].includes(column.property)) {
                  const prevRow = visibleData[_rowIndex - 1];
                  let nextRow = visibleData[_rowIndex + 1];
                  if (prevRow && prevRow[column.property] === cellValue) {
                    return { rowspan: 0, colspan: 0 };
                  } else {
                    let countRowspan = 1
                    while (nextRow && nextRow[column.property] === cellValue) {
                      nextRow = visibleData[++countRowspan + _rowIndex];
                    }
                    if (countRowspan > 1) {
                      return { rowspan: countRowspan, colspan: 1 };
                    }
                  }
                }
                }         
              },
              mergeBt(){
                setTimeout(()=>{
                document.querySelector('.hidden-cell').setAttribute('rowspan', '2');
               },10);
              }
            }
          }
  </script>
  <style>
  </style>