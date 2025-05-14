import React, { useEffect, useState } from 'react';
import { obterProduto, editarProduto } from '../services/produtoService';
import { useNavigate, useParams } from 'react-router-dom';

function EditarProduto() {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    async function fetch() {
      const res = await obterProduto(id);
      setForm(res.data);
    }
    fetch();
  }, [id]);

  if (!form) return <p>Carregando...</p>;

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    await editarProduto(id, form);
    nav('/produtos');
  };

  return (
    <div>
      <h2>Editar Produto</h2>
      <form onSubmit={handleSubmit}>
        <div><label>Nome:</label><input name="nome" value={form.nome} onChange={handleChange} required/></div>
        <div><label>Preço:</label><input name="preco" type="number" value={form.preco} onChange={handleChange} required/></div>
        <div><label>Quantidade:</label><input name="quantidade" type="number" value={form.quantidade} onChange={handleChange} required/></div>
        <div><label>Categoria:</label><input name="categoria" value={form.categoria} onChange={handleChange}/></div>
        <button type="submit">Gravar</button>
      </form>
    </div>
  );
}

export default EditarProduto;

