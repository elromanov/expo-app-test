import Colors from '@/src/constants/Colors';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Product } from '../types';
import { Link, useSegments } from 'expo-router';
import { Tables } from '../types';

type ProductListItemProps = {
    product: Tables<'products'>;
}

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();

  return(
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image source={{uri: product.image || defaultPizzaImage}} style={styles.image} />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>€{product.price}</Text>
      </Pressable>
    </Link>
  )
}

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    maxWidth: '50%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10
  },
  price: {
    fontWeight: 'bold',
    color: Colors.light.tint
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain',
  }
});
