async function consultarCEP(){
//Obtém o valor do CEP do input
    const cep = document.getElementById('cepInput').value;

    // Validação do formato do CEP (apenas dígitos, 8 caracteres)
    if (!/^\d{8}$/.test(cep)) {
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = '<p>CEP inválido. Deve conter apenas dígitos e ter 8 números.</p>';
        return;
    }

    //Constante para construir a varíavel com o CEP do usuário
    const apiUrl = `https://brasilapi.com.br/api/cep/v1/${cep}`;
    
    try{
        //Faz a requisição à API
        const response = await fetch(apiUrl);

        // Verifica se a resposta da API está ok
        if (!response.ok) {
            throw new Error("Erro ao consultar a API. Verifique o CEP informado.");
        }

        const data = await response.json()

        const dados = `${data.cep};${data.city};${data.neighborhood};${data.street};${data.state}`;

        // Texto a ser incluído no arquivo .txt
        const textoDoArquivo = dados;

        // Cria um blob com o texto
        const blob = new Blob([textoDoArquivo]);

        // Cria um link de download
        const linkDeDownload = document.createElement("a");
        linkDeDownload.href = URL.createObjectURL(blob);
        linkDeDownload.download = "arquivo.txt";

        // Adiciona o link ao documento HTML
        document.body.appendChild(linkDeDownload);

        // Simula um clique no link para iniciar o download
        linkDeDownload.click();

        //Exibe as informações na tela
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = `<p><strong>Download iniciado</strong>`;

        // Remove o link do documento após o download
        document.body.removeChild(linkDeDownload);    

       // Exibe mensagens de erro na página
    } catch (error){
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = '<p>Erro a consultar a API, verifique o CEP informado</p>'
}};