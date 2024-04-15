import React from 'react'
import { Text, View } from 'react-native'

import { IProductType as IProductCardProps } from 'src/types/product-types'

import { styles } from './productCard-styles'

const ProductCard = (props: IProductCardProps) => {
  const { title, price } = props
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Text>{price}</Text>
    </View>
  )
}

export default ProductCard
