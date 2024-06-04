type Props = {
    px: number
    py: number
    value: string
}

const WhiteButton = ({ px, py, value }: Props) => {
    const buttonStyle = {
        padding: `${py}px ${px}px`, 
    };

    return (
        <button className=" bg-white border border-brown-dark hover:bg-brown-light hover:text-snow transition duration-500 rounded-full" style={buttonStyle}>
            {value}
        </button>
    );
}

export default WhiteButton;
