export default function ErrorIndicator({ error }) {
    return <>
        <div style={{margin: 10}}>
           <b> Error: {error} </b>
        </div>
    </>
}