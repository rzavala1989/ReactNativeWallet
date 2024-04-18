import React, {FC, useEffect, useState} from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../config/colors";
import { TransactionSectionProps } from "./types";
import RegularText from "../Texts/RegularText";
import SmallText from "../Texts/SmallText";
import TransactionItem from "./TransactionItem";
import {TouchableOpacity} from "react-native";

const TransactionSectionBackground = styled.View`
	width: 100%;
	padding-horizontal: 25px;
	padding-top: 5px;
	flex: 2;
`;

const TransactionRow = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;

const TransactionList = styled.FlatList`
	width: 100%;
`;

const TransactionSection: FC<TransactionSectionProps> = ({ data }) => {
	const [sortedData, setSortedData] = useState([]);
	const [sortMethod, setSortMethod] = useState('recent');

	useEffect(() => {
		let sorted;
		if (sortMethod === 'recent') {
			// @ts-ignore
			sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
		} else {
			sorted = [...data].sort((a, b) => {
				const aAmount = Number(a.amount.replace(/[^0-9.-]+/g,""));
				const bAmount = Number(b.amount.replace(/[^0-9.-]+/g,""));
				return bAmount - aAmount;
			});
		}
		// @ts-ignore
		setSortedData(sorted);
	}, [data, sortMethod]);

	const handleSortMethodChange = () => {
		setSortMethod(prevMethod => prevMethod === 'recent' ? 'amount' : 'recent');
	};
	useEffect(() => {
		const sorted = [...data].sort((a, b) => {
			const aAmount = Number(a.amount.replace(/[^0-9.-]+/g,""));
			const bAmount = Number(b.amount.replace(/[^0-9.-]+/g,""));
			return bAmount - aAmount;
		});
		// @ts-ignore
		setSortedData(sorted);
	}, [data]);

	return (
		<TransactionSectionBackground>
			<TransactionRow
				style={{
					marginBottom: 25,
				}}
			>
				<RegularText textStyle={{ fontSize: 20, color: colors.secondary }}>
					Transactions
				</RegularText>
				<TouchableOpacity onPress={handleSortMethodChange}>
					<SmallText
						textStyle={{
							color: colors.secondary,
							fontSize: 15,
						}}
					>
						{sortMethod === 'recent' ? 'Recent' : 'Amount'}{" "}
						<Ionicons name="caret-down" size={13} color={colors.graydark} />
					</SmallText>
				</TouchableOpacity>
			</TransactionRow>
			<TransactionList
				data={sortedData}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 25 }}
				keyExtractor={({ id }: any) => id.toString()}
				renderItem={({ item }: any) => <TransactionItem {...item} />}
			/>
		</TransactionSectionBackground>
	);
};

export default TransactionSection;
