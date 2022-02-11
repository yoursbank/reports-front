// Icon import
import {
  BsXDiamondFill,
  BsCreditCard,
  IoGameControllerSharp,
  BiErrorCircle,
  BsCaretDownFill,
  RiBarcodeFill,
  MdSmartphone,
} from './icons';

export function statementInformation(type: string) {
  switch (type) {
    case 'Pix Enviado-Conta Transacional':
      return {
        icon: BsXDiamondFill,
        title: 'Pix',
        statementColor: '#EC5E2E',
      };

    case 'Pix Recebido-Cta Transacional':
      return {
        icon: BsXDiamondFill,
        title: 'Pix',
        statementColor: '#00BA34',
      };

    case 'Pix Env Não Processado':
      return {
        icon: BsXDiamondFill,
        title: 'Pix não processado',
        statementColor: '#EC5E2E',
      };

    case 'Devolucao Pix Enviado':
      return {
        icon: BsXDiamondFill,
        title: 'Devolução pix enviado',
        statementColor: '#EC5E2E',
      };

    case 'Devolucao Pix Recebido':
      return {
        icon: BsXDiamondFill,
        title: 'Devolução pix recebido',
        statementColor: '#EC5E2E',
      };

    case 'Compra Voucher':
      return {
        icon: IoGameControllerSharp,
        title: 'Compra de voucher',
        statementColor: '#EC5E2E',
      };

    case 'Compra Voucher Não Processado':
      return {
        icon: IoGameControllerSharp,
        title: 'Voucher não processado',
        statementColor: '#EC5E2E',
      };

    case 'Transf entre Contas-Favorecido':
      return {
        icon: BsCaretDownFill,
        title: 'Transferência',
        statementColor: '#00BA34',
      };

    case 'Transf Bancaria Enviada':
      return {
        icon: BsCaretDownFill,
        title: 'Transferência',
        statementColor: '#EC5E2E',
      };

    case 'Transf entre Contas-Remetente':
      return {
        icon: BsCaretDownFill,
        title: 'Transferência',
        statementColor: '#EC5E2E',
      };

    case 'Tarifa Geracao Boleto':
      return {
        icon: RiBarcodeFill,
        title: 'Geração Boleto',
        statementColor: '#EC5E2E',
      };

    case 'Compra Pré-Pago Visa Nacional':
      return {
        icon: BsCreditCard,
        title: 'Cartão',
        statementColor: '#EC5E2E',
      };

    case 'Recarga de Celular':
      return {
        icon: MdSmartphone,
        title: 'Recarga de celular',
        statementColor: '#EC5E2E',
      };

    case 'Rec Celular nao Processado':
      return {
        icon: MdSmartphone,
        title: 'Recarga de celular não processada',
        statementColor: '#EC5E2E',
      };

    case 'Ajuste a Credito':
      return {
        icon: BsCreditCard,
        title: 'Ajuste a Credito',
        statementColor: '#EC5E2E',
      };

    case 'Estorno Transf Ctas-Remetente':
      return {
        icon: BsCaretDownFill,
        title: 'Estorno',
        statementColor: '#EC5E2E',
      };

    default:
      return {
        icon: BiErrorCircle,
        title: type,
        statementColor: '#EC5E2E',
      };
  }
}
