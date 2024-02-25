import Button from '@/src/components/Button';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Colors from '@/src/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router';

const CreateProductScreen = () => {
    const [image, setImage] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');

    const {id} = useLocalSearchParams();
    const isUpdating = !!id;

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

        // save in database

        resetFields();
    };

    const onUpdateProduct = () => {
        if(!validateInputs()) return;

        // update in database

        resetFields();
    };

    const onDeleteProduct = () => {
        console.warn('delete product');
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