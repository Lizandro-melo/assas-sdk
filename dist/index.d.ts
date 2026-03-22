import { PropsCreateClient, PropsCreateCreditCardSub, PropsCreateSub, PropsListSubscriptionPaymentsResponse, PropsPayment, PropsUpdateSubCreditCard } from "./type/index.js";
export default class Asaas {
    private API_KEY;
    private HTTP;
    private WALLET_ID;
    private DAYS_EXPIRE_SUB;
    /**
     *
     * @param API_KEY Chave API do Assas
     * @param DAYS_EXPIRE_SUB Valor numérico de configuração, caso você queira passar o numero de dias toleráveis para atrasar um pagamento
     */
    constructor(API_KEY: string, DAYS_EXPIRE_SUB?: number | undefined);
    init(): Promise<this>;
    /**
     *
     * @param key Chave API
     * @description Função para identificar o typo de ambiente, baseado na chave passada
     */
    private identify_type_by_key;
    /**
     * @description Função responsável por realizar um pequeno teste de requisição validando a chave API
     */
    private test_key;
    /**
     *
     * @param param0 Props de create cliente
     * @returns ID do cliente criado
     */
    create_client({ ...props }: PropsCreateClient): Promise<string>;
    /**
     *
     * @param id Id Asaas do cliente
     * @returns Retorna todas as informações do cliente
     */
    find_unique_client(id: string): Promise<PropsCreateClient>;
    /**
     *
     * @param id Id Asaas do cliente
     * @description Ao desativar o cliente, tudo que for relacionado ao cliente dentro do Asaas também é apagado
     */
    delete_client(id: string): Promise<void>;
    /**
     *
     * @param param0 Props para criar uma assinatura.
     * @returns Id da assinatura gerada.
     */
    create_sub({ ...props }: PropsCreateSub): Promise<string>;
    /**
     *
     * @param param0 Props para criar uma assinatura com cartão de credito.
     * @returns Id da assinatura gerada.
     */
    create_sub_with_card({ ...props }: PropsCreateCreditCardSub): Promise<string>;
    /**
     *
     * @param param0 Dados do cartão
     */
    update_card_by_sub({ ...props }: PropsUpdateSubCreditCard): Promise<void>;
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
    list_payments_by_sub({ id_sub, status, }: {
        id_sub: string;
        status?: PropsPayment["status"];
    }): Promise<PropsListSubscriptionPaymentsResponse>;
    private error_asaas;
}
