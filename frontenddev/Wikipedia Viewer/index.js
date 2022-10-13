function App() {
    const [search, setSearch] = React.useState('')
    const [searchResults, setSearchResults] = React.useState([])
    const [resultN, setResultN] = React.useState(0)

    const handleSearch = async (e) => {
        e.preventDefault()
        if (search === '') return
        const endpoint = 'https://en.wikipedia.org/w/api.php'
        const url = `${endpoint}?action=query&list=search&srsearch=${search}&origin=*&format=json`
        const response = await fetch(url, { method: 'GET' })
        const data = await response.json()
        console.log(data)
        setSearchResults(data.query.search)
        setResultN(data.query.searchinfo.totalhits)
        console.log(data.query.search)
    }

    return (
        <div className='container'>
            <div className='header'>
                <h1 className='title'>Wikipedia Viewer</h1>
                <form className='search-bar' onSubmit={handleSearch}>
                    <input
                        type='search'
                        className='search-bar-input'
                        placeholder='What do you want to know?'
                        autoFocus
                        required
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className='button' type='button' onClick={handleSearch}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='36'
                            height='26'
                            fill='#fff'
                            className='bi bi-search'
                            viewBox='0 0 16 16'
                        >
                            <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
                        </svg>
                    </button>
                </form>
                <div className='d-flex mb-5'>
                    <p className='me-5'>Search Results: {resultN}</p>
                    <p className='ms-5 random-page'>
                        <a href='https://en.wikipedia.org/wiki/Special:Random' target='_blank'>
                            Click me for a random page
                        </a>
                    </p>
                </div>
            </div>

            <div className='results'>
                {searchResults.map((result, i) => {
                    return (
                        <div className='result' key={i}>
                            <a
                                href={`https://en.wikipedia.org/w/index.php?curid=${result.pageid}`}
                                className='result-link'
                                target='_blank'
                            >
                                <h3 className='title'>{result.title}</h3>
                                <div dangerouslySetInnerHTML={{ __html: result.snippet }} />
                            </a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
const container = document.getElementById('app')
const root = ReactDOM.createRoot(container)
root.render(<App />)
