import styled from 'styled-components';

export const TextInput = styled.TextInput`
  height: 40px;
  borderwidth: 1px;
  borderradius: 10px;
`;

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background: #f8f9fa;
`;

export const CenteredView = styled.SafeAreaView`
  flex: 1;
  alignitems: center;
  justifycontent: center;
`;

export const PrimaryButton = styled.TouchableOpacity`
  backgroundcolor: #007bff;
  color: #ffffff;
  height: 50px;
  borderradius: 10px;
  justifycontent: center;
`;

export const PrimaryButtonText = styled.Text`
  color: #ffffff;
  textalign: center;
  fontsize: 18px;
`;

export const PrimaryButtonAlt = styled.TouchableOpacity`
  height: 50px;
  borderradius: 10px;
  justifycontent: center;
`;

export const PrimaryButtonAltText = styled.Text`
  color: #007bff;
  textalign: center;
  fontsize: 18px;
`;

export const SecondaryButton = styled.TouchableOpacity`
  fontsize: 16px;
  paddingright: 20;
`;

export const SecondaryButtonText = styled.Text`
  color: #4c5e7a;
  textalign: center;
  fontsize: 18px;
`;

export const ImageLogo = styled.Image`
  marginleft: 5%;
  width: 35%;
  resizemode: contain;
`;

export const PrimaryTextInput = styled.TextInput`
  background: #f4f7fa;
  height: 50px;
  borderradius: 10px;
  padding: 10px;
`;
