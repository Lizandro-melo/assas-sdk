# Asaas SDK (TypeScript)

SDK simples para integração com a API do **Asaas**, escrito em **TypeScript** para uso em projetos Node.js.

Este projeto foi desenvolvido originalmente para **uso pessoal**, com o objetivo de simplificar integrações recorrentes com a API do Asaas.
Mesmo assim, o código foi disponibilizado publicamente para quem quiser **utilizar, estudar ou melhorar a implementação**.

Se o SDK for útil para o seu projeto, fique à vontade para usar.
Se quiser melhorar algo, também.

---

## Aviso importante

Este **não é um SDK oficial** do Asaas.

* Projeto independente
* Sem vínculo com o Asaas
* Pode não cobrir todos os endpoints da API

Use conforme sua necessidade e revise o código antes de utilizar em produção.

---

## Tecnologias utilizadas

* Node.js
* TypeScript
* Axios
* dotenv

---

## Instalação

Você pode instalar diretamente do repositório Git:

```bash
npm install git+https://github.com/seu-usuario/asaas-sdk.git
```

ou usando pnpm:

```bash
pnpm add https://github.com/seu-usuario/asaas-sdk.git
```

---

## Configuração

Defina sua chave da API do Asaas usando variáveis de ambiente.

Crie um arquivo `.env` na raiz do projeto:

```
ASAAS_API_KEY=sua_chave_api
```

Exemplo:

```
ASAAS_API_KEY=$aact_prod_xxxxxxxxx
```

---

## Uso básico

```ts
import Asaas from "asaas-sdk"

const asaas = new Asaas(process.env.ASAAS_API_KEY!)
```

---

## Criando um cliente

```ts
const customerId = await asaas.createClient({
  name: "João Silva",
  cpfCnpj: "12345678900",
  email: "joao@email.com"
})
```

---

## Buscando um cliente

```ts
const customer = await asaas.findClient(customerId)
```

---

## Removendo um cliente

```ts
await asaas.deleteClient(customerId)
```

---

## Criando uma assinatura

```ts
const subscriptionId = await asaas.createSubscription({
  customer: customerId,
  billingType: "BOLETO",
  value: 100,
  nextDueDate: "2025-04-01",
  cycle: "MONTHLY"
})
```

---

## Criando assinatura com cartão

```ts
const subscriptionId = await asaas.createSubscriptionWithCard({
  customer: customerId,
  billingType: "CREDIT_CARD",
  value: 100,
  nextDueDate: "2025-04-01",
  cycle: "MONTHLY",

  creditCard: {
    holderName: "João Silva",
    number: "0000000000000000",
    expiryMonth: "12",
    expiryYear: "2030",
    ccv: "123"
  },

  creditCardHolderInfo: {
    name: "João Silva",
    email: "joao@email.com",
    cpfCnpj: "12345678900",
    postalCode: "00000000",
    addressNumber: "100"
  }
})
```

---

## Atualizando cartão da assinatura

```ts
await asaas.updateSubscriptionCard({
  id: subscriptionId,
  remoteIp: "127.0.0.1",

  creditCard: {
    holderName: "João Silva",
    number: "0000000000000000",
    expiryMonth: "12",
    expiryYear: "2030",
    ccv: "123"
  },

  creditCardHolderInfo: {
    name: "João Silva",
    email: "joao@email.com",
    cpfCnpj: "12345678900",
    postalCode: "00000000",
    addressNumber: "100"
  }
})
```

---

## Listar pagamentos de uma assinatura

```ts
const payments = await asaas.listPaymentsBySubscription({
  id_sub: subscriptionId,
  status: "PENDING"
})
```

---

## Estrutura do projeto

```
src
 ├ asaas
 │  └ index.ts
 ├ log
 │  └ index.ts
 ├ type
 │  └ index.ts
 └ index.ts
```

---

## Desenvolvimento

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/asaas-sdk
cd asaas-sdk
```

Instale as dependências:

```bash
pnpm install
```

Rodar em modo desenvolvimento:

```bash
pnpm dev
```

Build do projeto:

```bash
pnpm build
```

---

## Contribuições

O projeto foi criado para resolver necessidades específicas de integração com o Asaas.
Mesmo assim, melhorias são bem-vindas.

Você pode:

* abrir **issues**
* sugerir melhorias
* enviar **pull requests**

---

## Licença

MIT
