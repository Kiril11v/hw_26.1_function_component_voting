function Counter({ src, alt, votes, onVote }) {
    return (
        <div>
            <img src={src} alt={alt}
            style={{  width: '120px', cursor: 'pointer' }}
            onClick={onVote} 
            className="emoji"/>
            <p>{votes}</p>
        </div>
        
    )
}

export default Counter