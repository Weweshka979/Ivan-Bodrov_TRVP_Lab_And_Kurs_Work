class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SearchText: "Поиск..."
        }
    }
    
    func_alert(text) {
        alert(`Раздел ${text} недоступен`);
    }
    
    toggleMenu() {
        const menu = document.getElementById('dropdownMenu');
        menu.classList.toggle('show');
    }
    
    togglePlanet() {
        const menu = document.getElementById('dropdownPlanet');
        menu.classList.toggle('show');
    }
    
    searchClick() {
        document.querySelector("form").addEventListener("submit", function(event) {
            event.preventDefault();
            alert("Функция поиска на данный момент недоступна");
            document.querySelector("form").reset();
        });
        
        this.setState({ SearchText: "Недоступно" });
    }

    render() {
        return (
            <div className="App">
                <header>
                    <div className="header-left">
                        <img id="logo" src="https://avatars.mds.yandex.net/i?id=0e4bbfc55bd6ad61fc9202a00b49e2d008832ead-5886345-images-thumbs&n=13" alt="Логотип"/>
                        <button className="menu-button" id="Planet" onClick={() => {
                            this.togglePlanet();
                        }}>Планеты</button>
                        <div id="d3">
                            <div className="dropdown-menu" id="dropdownPlanet">
                                <button className="menu-item" id="planet1" onClick={() => {
                                    this.func_alert("Космическая станция \"Герта\" ");
                                }}>Космическая станция "Герта"</button>
                                <button className="menu-item" id="planet2" onClick={() => {
                                    this.func_alert("Ярило-VI");
                                }}>Ярило-VI</button>
                                <button className="menu-item" id="planet3" onClick={() => {
                                    this.func_alert("Лофу Сяньчжоу");
                                }}>Лофу Сяньчжоу</button>
                                <button className="menu-item" id="planet4" onClick={() => {
                                    this.func_alert("Пенакония");
                                }}>Пенакония</button>
                                <button className="menu-item" id="planet5" onClick={() => {
                                    this.func_alert("Амфореус");
                                }}>Амфореус</button>
                            </div>
                        </div>
                    </div>

                    <div className="header-right">
                        <div id="d1">
                            <form>
                                <input id="search_box" placeholder={this.state.SearchText}/>
                                <button type="submit" id="search" onClick={() => { this.searchClick() }}> &#128269;</button>
                            </form>
                        </div>
                        <button className="menu-button" id="menuButton" onClick={() => {
                            this.toggleMenu();
                        }}>☰</button>
                        <div id="d2">
                            <div className="dropdown-menu" id="dropdownMenu">
                                <button className="menu-item" id="news" onClick={() => {
                                    this.func_alert("Новости");
                                }}>Новости</button>
                                <button className="menu-item" id="modes" onClick={() => {
                                    this.func_alert("Режимы");
                                }}>Режимы</button>
                                <button className="menu-item" id="party" onClick={() => {
                                    this.func_alert("Отряды");
                                }}>Отряды</button>
                            </div>
                        </div>
                    </div>
                </header>
                
                <div className="main-content">
                    <h2>Вселенная Honkai: Star Rail</h2>
                    <p>Это компьютерная ролевая игра с элементами гача, разработанная компанией miHoYo. Это первая пошаговая игра miHoYo. Сюжет повествует о главном герое, известном как Первопроходец, который путешествует между мирами на космическом поезде «Звёздный Экспресс», помогая различным цивилизациям и устраняя катастрофы, вызванные «Стелларонами» и другими силами. Это четвёртая часть серии Honkai (первые две части носили название Houkai), в которой используются новые персонажи наряду с альтернативными версиями существующих персонажей из Honkai Impact 3rd</p>

                    <div className="carousel-container">
                        <h2>Персонажи</h2>
                        <div className="carousel">
                            <p style={{textAlign: 'center', padding: '40px', color: '#666'}}>
                                Компонент персонажей временно недоступен. Будет добавлен в будущем
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);