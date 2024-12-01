<template>

  <div class="tree-select">
    <input type="text" v-model="searchText" @input="filterItems" placeholder="Search..." />
    <ul>
      <li v-for="item in filteredItems" :key="item.id">
        {{ item.name }}
        <ul v-if="item.children">
          <li v-for="child in item.children" :key="child.id">
            {{ child.name }}
            <ul v-if="child.children">
              <li v-for="grandchild in child.children" :key="grandchild.id">
                {{ grandchild.name }}
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchText: '',
      items: [
        {
          id: 1,
          name: 'Category 1',
          children: [
            {
              id: 2,
              name: 'Subcategory 1.1',
              children: [
                {
                  id: 3,
                  name: 'Subcategory 1.1.1',
                },
                {
                  id: 4,
                  name: 'Subcategory 1.1.2',
                },
              ],
            },
            {
              id: 5,
              name: 'Subcategory 1.2',
            },
          ],
        },
        {
          id: 6,
          name: 'Category 2',
          children: [
            {
              id: 7,
              name: 'Subcategory 2.1',
            },
            {
              id: 8,
              name: 'Subcategory 2.2',
            },
          ],
        },
      ],
      filteredItems: [],
    };
  },
  mounted() {
    this.filteredItems = this.items;
  },
  methods: {
    filterItems() {
      if (this.searchText === '') {
        this.filteredItems = this.items;
      } else {
        this.filteredItems = this.search(this.items);
      }
    },
    search(items) {
      let result = [];

      for (let item of items) {
        if (item.name.toLowerCase().includes(this.searchText.toLowerCase())) {
          result.push(item);
        } else if (item.children) {
          const children = this.search(item.children);
          if (children.length > 0) {
            result.push({
              ...item,
              children,
            });
          }
        }
      }

      return result;
    },
    selectItem(item) {
      console.log('Selected item:', item);
    },
  },
};
</script>
<style scoped>
.tree-select {
  position: relative;
  width: 200px;
}

.tree-select__input {
  position: relative;
}

.tree-select__input input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.tree-select__input .icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}

.tree-select__list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 5px 5px;
  background-color: #fff;
  z-index: 10;
}

.tree-select__list li {
  padding: 10px;
  cursor: pointer;
}

.tree-select__list li:hover {
  background-color: #f0f0f0;
}

.tree-select__list li.selected {
  background-color: #e0e0e0;
}

.tree-select__list li .icon {
  margin-right: 5px;
}

.tree-select__list li .icon.open {
  transform: rotate(90deg);
}

.tree-select__list li .icon.closed {
  transform: rotate(0deg);
}
</style>