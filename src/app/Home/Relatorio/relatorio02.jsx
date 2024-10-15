import React, { useContext, useEffect, useState, useCallback } from 'react';
import { getFirestore, collection, getDocs, where, query } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthContext } from '../../Acesso/Context/auth';
import Swal from 'sweetalert2';

function Relatorio02(props) {
  const [quantidadeClientes, setQuantidadeClientes] = useState(0);
  const [quantidadeMeta, setQuantidadeMeta] = useState(0);
  const dataInicio = new Date('2024-09-25');

  const { setLogado } = useContext(AuthContext);
  const auth = getAuth();

  const handleVerificarPagos = useCallback(async () => {
    try {
      const db = getFirestore();
      const userId = auth.currentUser?.uid;

      let q = query(collection(db, 'clientes'), where('userId', '==', userId));

      const querySnapshot = await getDocs(q);
      const listaCli = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        cpf: doc.data().cpf,
        nome: doc.data().nome,
        email: doc.data().email,
        uf: doc.data().uf,
        fone: doc.data().fone,
        operador: doc.data().operador,
        simPago: doc.data().simPago,
        venc2: doc.data().venc2,
        dataPagamento: doc.data().dataPagamento,
        data: doc.data().data,
      }));

      console.log('Lista de clientes:', listaCli);

      let contadorMeta = 0;

      listaCli.forEach(cliente => {
        const dataVenda = new Date(cliente.data);
        if (cliente.simPago && dataVenda >= dataInicio) {
          contadorMeta++;
        }
      });

      setQuantidadeClientes(listaCli.length);
      setQuantidadeMeta(contadorMeta);
    } catch (error) {
      console.error('Erro ao obter dados:', error);
      Swal.fire('Erro', 'Não foi possível carregar os dados. Tente novamente mais tarde.', 'error');
    }
  }, [auth]);

  const Logout = () => {
    setLogado(false);
    localStorage.removeItem('logado');
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogado(true);
        handleVerificarPagos();
      } else {
        setLogado(false);
      }
    });
    return () => unsubscribe();
  }, [auth, setLogado, handleVerificarPagos]);

  return (
    <div>
      {quantidadeClientes === 0 ? (
        <p>Nenhum cliente encontrado.</p>
      ) : (
        <div className="summary">
          <p>Total de Clientes: {quantidadeClientes}</p>
          <p>Total de Vendas Pagas desde 23/09/2024: {quantidadeMeta}</p>
        </div>
      )}
      <button className="btn-voltar07 btn btn-danger" onClick={() => window.history.back()}>Voltar</button>
    </div>
  );
}

export default Relatorio02;
