import Button from '@/src/components/Button';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Colors from '@/src/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router';

const CreateProductScreen = () => {
    const [image, setImage] = useState<string | null>(null);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const [error, setError] = useState('');

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

    const onCreateProduct = () => {
        if(!validateInputs()) return;

        // save in database

        resetFields();
    };

    return(
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Create Product' }}/>

            <Image source={{uri: image || defaultPizzaImage}} style={styles.image}/>
            <Text onPress={pickImage} style={styles.textButton}>Select image</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName}/>

            <Text style={styles.label}>Price (€)</Text>
            <TextInput placeholder="9.99" style={styles.input} keyboardType='numeric' value={price} onChangeText={setPrice}/>

            <Text style={{color: 'red'}}>{error}</Text>
            <Button text="Create Product" onPress={onCreateProduct}/>
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