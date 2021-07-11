import styled from 'styled-components';

export const TextInput = styled.TextInput`
  height: 40px;
  borderWidth: 1px;
  borderRadius: 10px;
`;

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background: #f8f9fa;
`;

export const CenteredView = styled.SafeAreaView`
  flex: 1;
  alignItems: center;
  justifyContent: center;
`;

export const PrimaryButton = styled.TouchableOpacity`
  backgroundColor: #007BFF;
  color: #FFFFFF;
  height: 50px;
  borderRadius: 10px;
  justifyContent: center;
`;

export const PrimaryButtonText = styled.Text`
  color: #FFFFFF;
  textAlign: center;
  fontSize: 18px;
`;

export const PrimaryButtonAlt = styled.TouchableOpacity`
  height: 50px;
  borderRadius: 10px;
  justifyContent: center;
`;

export const PrimaryButtonAltText = styled.Text`
  color: #007BFF;
  textAlign: center;
  fontSize: 18px;
`;

export const SecondaryButton = styled.TouchableOpacity`
  fontSize: 16px;
  paddingRight: 20;
`;

export const SecondaryButtonText = styled.Text`
  color: #4C5E7A;
  textAlign: center;
  fontSize: 18px;
`;

export const ImageLogo = styled.Image`
  marginLeft: 5%;
  width: 35%;
  resizeMode: contain;
`;

export const PrimaryTextInput = styled.TextInput`
  background: #f4f7fa;
  height: 50px;
  borderRadius: 10px;
  padding: 10px;
`;