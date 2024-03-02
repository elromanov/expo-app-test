import Button from '@/src/components/Button';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Colors from '@/src/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from '@/src/api/products';

const CreateProductScreen = () => {
    const [image, setImage] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');

    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0]);
    const isUpdating = !!id;

    const { mutate: insertProduct } = useInsertProduct();
    const { mutate: updateProduct } = useUpdateProduct();
    const { data: updatingProduct } = useProduct(id);
    const { mutate: deleteProduct } = useDeleteProduct();

    const router = useRouter();

    useEffect(() => {
        if(updatingProduct){
            setName(updatingProduct.name);
            setPrice(updatingProduct.price.toString());
            setImage(updatingProduct.image);
        }
    }, [updatingProduct]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if(!result.canceled){
            setImage(result.assets[0].uri);
        }
    };

    const validateInputs = () => {
        if(!name){
            setError('Please enter a name');
            return false;
        }
        if(!name){
            setError('Please enter a price');
            return false;
        }
        if(isNaN(parseFloat(price))){
            setError('Please enter a valid price');
            return false;
        }

        return true;
    };

    const resetFields = () => {
        setName('');
        setPrice('');
        setError('');
    };

    const onSubmit = () => {
        if(isUpdating){
            onUpdateProduct();
        } else {
            onCreateProduct();
        }
    };

    const onCreateProduct = () => {
        if(!validateInputs()) return;

        insertProduct({name, price: parseFloat(price), image}, {
            onSuccess: () => {
                resetFields();
                router.back();
            }
        })

    };

    const onUpdateProduct = () => {
        if(!validateInputs()) return;

        updateProduct({id,name,price: parseFloat(price),image},
            {
                onSuccess: () => {
                    resetFields();
                    router.back();
                }
            }
        );
    };

    const onDeleteProduct = () => {
        deleteProduct(id, {
            onSuccess: () => {
                resetFields();
                router.replace('/(admin)');
            }
        })
    };

    const confirmDelete = () => {
        Alert.alert('Delete product', 'Are you sure you want to delete this product ?', [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Delete', style: 'destructive', onPress: onDeleteProduct}
        ]);
    };

    return(
        <View style={styles.container}>
            <Stack.Screen options={{ title: isUpdating ? "Update product" : 'Create Product' }}/>

            <Image source={{uri: image || defaultPizzaImage}} style={styles.image}/>
            <Text onPress={pickImage} style={styles.textButton}>Select image</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName}/>

            <Text style={styles.label}>Price (€)</Text>
            <TextInput placeholder="9.99" style={styles.input} keyboardType='numeric' value={price} onChangeText={setPrice}/>

            <Text style={{color: 'red'}}>{error}</Text>
            <Button text={isUpdating ? "Update product" : "Create product"} onPress={onSubmit}/>
            {isUpdating && <Text onPress={confirmDelete} style={styles.textButton}>Delete</Text>}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20
    },
    label: {
        color: 'gray',
        fontSize: 16
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    textButton: {
        alignSelf: 'center',
        color: Colors.light.tint,
        fontWeight: 'bold',
        marginVertical: 10
    }
});

export default CreateProductScreen;