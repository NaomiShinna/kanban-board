function Button({type, className, id, onClick, variant, children}){
    return (
        <button 
            type={type ? type : "button"} 
            variant={variant} 
            className={className ? `btn ${className}` : "btn"}
            id={id}
            onClick={onClick}>
        {children}
        </button>
    )
}

export default Button;