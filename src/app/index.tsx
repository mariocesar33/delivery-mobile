import { useState, useRef } from 'react'
import { FlatList, View, SectionList, Text } from 'react-native'
import { Link } from 'expo-router'

import { CATEGORIES, MENU, ProductProps } from '@/utils/data/products'

import { Header } from '@/components/hearder'
import { CategoryButton } from '@/components/category-button'
import { Product } from '@/components/product'
import { useCartStore } from '@/stores/cart-stores'


export default function Home(){
  const cartStore = useCartStore()
  const [category, setcategory] = useState("Promoções")

  const sectionListRef = useRef<SectionList<ProductProps>>(null)

  const cartQuantityItems = cartStore.products.reduce(
    (total, product) => total + product.quantity, 0
  )

  function handleCategorySelect(selectedCategory: string) {
    // console.log(selectedCategory)
    setcategory(selectedCategory)

    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === selectedCategory
    )
    // console.log(sectionIndex)

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      })
    }
  }

  return (
    <View className='flex-1 pt-10'>
      <Header title='Faça o seu pedido' cartQuantity={cartQuantityItems} />

      <FlatList
        keyExtractor={(item) => item}
        data={CATEGORIES}
        renderItem={({ item }) => (
          <CategoryButton 
            title={item} 
            isSelected={item === category}
            onPress={() => handleCategorySelect(item)}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />

      <SectionList
        ref={sectionListRef}
        className='flex-1 p-5'
        contentContainerStyle={{ paddingBottom: 50}}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        sections={MENU}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item}/>
          </Link>
        )}
        renderSectionHeader={({ section: { title }}) =>
          <Text className='text-xl text-white font-heading mt-8 mb-3'>
            {title}
          </Text>}
      />
    </View>
  )
}