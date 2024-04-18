import React, { FC } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";

import { colors } from "../../config/colors";
import RegularButton from "../Buttons/RegularButton";
import { Props as BalanceProps } from "../../screens/Balance";

const ButtonSectionBackground = styled.View`
 width: 100%;
 align-items: center;
 flex: 1;
`;

interface ButtonSectionProps {
  onRemove: () => void;
}

interface ButtonSectionProps {
    onRemove: () => void;
    alias: string; // Add this line
}

const ButtonSection: FC<ButtonSectionProps> = ({ onRemove, alias }) => {
    const navigation = useNavigation<BalanceProps["navigation"]>();

    const handlePress = () => {
        Alert.alert(
            `Card Removed: ${alias}`, // Use the alias here
            "",
            [
                { text: "OK", onPress: () => {
                        onRemove();
                        navigation.goBack();
                    }}
            ],
            { cancelable: false }
        );
    };

    return (
        <ButtonSectionBackground>
            <RegularButton
                btnStyle={{ width: "50%" }}
                onPress={handlePress}
            >
                Cancel <Ionicons name="card" size={20} color={colors.white} />
            </RegularButton>
        </ButtonSectionBackground>
    );
};

export default ButtonSection;
