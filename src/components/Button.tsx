import { Heading, Button as NativeBaseButton } from "native-base";

interface ButtonProps extends React.ComponentProps<typeof NativeBaseButton> {
  label: string;
}

export const Button: React.FC<ButtonProps> = ({ label, ...rest }) => {
  return (
    <NativeBaseButton
      bg="secondary.700"
      width={"full"}
      height={12}
      _pressed={{ bgColor: "secondary.900" }}
      {...rest}
    >
      <Heading color="primary.700" fontFamily={"bold"} fontSize={15}>
        {label}
      </Heading>
    </NativeBaseButton>
  );
};
