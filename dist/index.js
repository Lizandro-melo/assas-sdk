import axios from "axios";
import { White_Log_Info, White_Log_Erro } from "./log/index.js";
export default class Asaas {
    API_KEY;
    HTTP;
    WALLET_ID;
    DAYS_EXPIRE_SUB;
    /**
     *
     * @param API_KEY Chave API do Assas
     * @param DAYS_EXPIRE_SUB Valor numérico de configuração, caso você queira passar o numero de dias toleráveis para atrasar um pagamento
     */
    constructor(API_KEY, DAYS_EXPIRE_SUB) {
        this.API_KEY = `$${API_KEY}`;
        const baseURL = this.identify_type_by_key(this.API_KEY);
        this.DAYS_EXPIRE_SUB = DAYS_EXPIRE_SUB ?? 0;
        this.HTTP = axios.create({
            baseURL,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                access_token: this.API_KEY,
            },
        });
        White_Log_Info("API ASAAS Conectada!");
    }
    async init() {
        await this.test_key();
        return this;
    }
    /**
     *
     * @param key Chave API
     * @description Função para identificar o typo de ambiente, baseado na chave passada
     */
    identify_type_by_key(key) {
        const type = key.split("_")[1];
        switch (type) {
            case "prod":
                return "https://api.asaas.com/v3";
            case "hmlg":
                return "https://api-sandbox.asaas.com/v3";
        }
    }
    /**
     * @description Função responsável por realizar um pequeno teste de requisição validando a chave API
     */
    async test_key() {
        try {
            await this.HTTP.get(`/customers`);
        }
        catch (err) {
            const message = err?.response?.data?.errors?.[0]?.description ??
                "Erro ao validar chave ASAAS";
            White_Log_Erro(message);
            throw new Error(message);
        }
    }
    /**
     *
     * @param param0 Props de create cliente
     * @returns ID do cliente criado
     */
    async create_client({ ...props }) {
        try {
            const { data } = await this.HTTP.post(`/customers`, {
                ...props,
            });
            return data.id;
        }
        catch (err) {
            throw this.error_asaas(err, "Erro ao criar cliente");
        }
    }
    /**
     *
     * @param id Id Asaas do cliente
     * @returns Retorna todas as informações do cliente
     */
    async find_unique_client(id) {
        try {
            const { data } = await this.HTTP.get(`/customers/${id}`);
            White_Log_Info("Cliente encontrado");
            return data;
        }
        catch (err) {
            throw this.error_asaas(err, "Erro ao buscar cliente");
        }
    }
    /**
     *
     * @param id Id Asaas do cliente
     * @description Ao desativar o cliente, tudo que for relacionado ao cliente dentro do Asaas também é apagado
     */
    async delete_client(id) {
        try {
            await this.HTTP.delete(`/customers/${id}`);
            White_Log_Info("Cliente removido");
        }
        catch (err) {
            throw this.error_asaas(err, "Erro ao remover cliente");
        }
    }
    /**
     *
     * @param param0 Props para criar uma assinatura.
     * @returns Id da assinatura gerada.
     */
    async create_sub({ ...props }) {
        try {
            const { data } = await this.HTTP.post("/subscriptions", props);
            White_Log_Info("Assinatura criada");
            return data.id;
        }
        catch (err) {
            throw this.error_asaas(err, "Erro ao criar assinatura");
        }
    }
    /**
     *
     * @param param0 Props para criar uma assinatura com cartão de credito.
     * @returns Id da assinatura gerada.
     */
    async create_sub_with_card({ ...props }) {
        try {
            const { data } = await this.HTTP.post("/subscriptions", props);
            White_Log_Info("Assinatura com cartão criada");
            return data.id;
        }
        catch (err) {
            throw this.error_asaas(err, "Erro ao criar assinatura com cartão");
        }
    }
    /**
     *
     * @param param0 Dados do cartão
     */
    async update_card_by_sub({ ...props }) {
        try {
            await this.HTTP.put(`/subscriptions/${props.id}/creditCard`, props);
            White_Log_Info("Cartão da assinatura atualizado");
        }
        catch (err) {
            throw this.error_asaas(err, "Erro ao atualizar cartão");
        }
    }
    /**
     *
     * @param id_sub Identificação da assinatura (Obrigatório)
     * @param status (Opcional) caso você queria listar apenas as cobranças de uma certa pendencia
     *
     * Status esses:
     * PENDING
     * RECEIVED
     * CONFIRMED
     * OVERDUE
     * REFUNDED
     * RECEIVED_IN_CASH
     * REFUND_REQUESTED
     * REFUND_IN_PROGRESS
     * CHARGEBACK_REQUESTED
     * CHARGEBACK_DISPUTE
     * AWAITING_CHARGEBACK_REVERSAL
     * DUNNING_REQUESTED
     * DUNNING_RECEIVED
     * AWAITING_RISK_ANALYSIS
     *
     * @returns retorna a lista.
     */
    async list_payments_by_sub({ id_sub, status, }) {
        try {
            const { data } = await this.HTTP.get(`/subscriptions/${id_sub}/payments`, {
                params: { status },
            });
            return data;
        }
        catch (err) {
            throw this.error_asaas(err, "Erro ao listar pagamentos da assinatura");
        }
    }
    error_asaas(err, fallback) {
        const message = err?.response?.data?.errors?.[0]?.description ?? fallback;
        White_Log_Erro(message);
        throw new Error(message);
    }
}
