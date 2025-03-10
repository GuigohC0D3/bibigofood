import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const PreloadingScreen = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push('/(tabs)'); // Redireciona para a página principal após o loading
        }, 2000); // Simula um loading de 2 segundos
    }, []);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#FF5733" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

export default PreloadingScreen;
