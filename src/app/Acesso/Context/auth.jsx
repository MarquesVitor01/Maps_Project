import React, {useState} from 'react';
import { auth, db } from '../../Acesso/Config/firebase'; // Certifique-se de que o caminho está correto
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = React.createContext({});
function AuthProvider(props){
    let isLogado = localStorage.getItem("logado");
    const [logado, setLogado] = useState(isLogado === "S" ? true : false);
    return (
        <AuthContext.Provider value={{logado, setLogado}}>
            {props.children}
        </AuthContext.Provider>
    )
}
export {AuthContext, AuthProvider};