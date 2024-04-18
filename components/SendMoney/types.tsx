import { ImageSourcePropType } from "react-native";

export interface SendMoneyProps {
	id: number;
	name: string;
	amount: string;
	background: string;
	image: ImageSourcePropType;
	onSendMoney: (id: number) => void;
}

export interface SendMoneySectionProps {
	data: Array<SendMoneyProps>;
	onSendMoney: (id: number) => void;
}
