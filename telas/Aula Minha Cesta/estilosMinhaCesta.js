import { StyleSheet } from "react-native";

export default StyleSheet.create({

    nome: {
        color: 'purple',
        fontWeight: 'bold',
        fontSize: 24,
    },

    descricao: {
        color: 'black',
        fontSize: 16,
    },

    preco: {
        color: 'purple',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
        marginRight: 8
    },
    
    margem: {
        marginTop: 10,
        padding: 24,
    },

    listaDesejos: {
        paddingHorizontal: 24,
        paddingBottom: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        flexWrap: 'wrap',
    },

    posicao: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        flexWrap: 'wrap',
    },

    divisor: {
        marginHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },

    image: {
        width: 90,
        height: 90,
    }

});