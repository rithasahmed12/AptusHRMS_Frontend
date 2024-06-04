type Props = {
    px: number
    py: number
    value: string
}

const BrownButton = ({ px, py, value }: Props) => {
    const buttonStyle = {
        padding: `${py}px ${px}px`, 
    };

    return (
        <button className="text-snow bg-brown-dark hover:bg-brown-light transition duration-300 rounded-full" style={buttonStyle}>
            {value}
        </button>
    );
}

export default BrownButton;
