if (sessionStorage.ADM == 1) {
    sidebar.innerHTML += `
    <div class="sidenav">
                <ul>
                    <li onclick="pagVisaoGeral()" class="nav-item">
                        <i class="fa-solid fa-grip"></i>
                        <span class="nav-text">Visão Geral</span>
                    </li>
                    <li onclick="pagDash()" class="nav-item">
                        <i class="fa-solid fa-chart-line"></i>
                        <span class="nav-text">Dashboard</span>
                    </li>
                    <li onclick="pagFunc()" class="nav-item">
                        <i class="fa-solid fa-user"></i>
                        <span class="nav-text">Cadastrar Funcionário</span>
                    </li>
                    <li onclick="pagSetor()" class="nav-item">
                        <i class="fa-solid fa-shop"></i>
                        <span class="nav-text">Cadastrar Terreno</span>
                    </li>
                    <li onclick="sair()" class="nav-item">
                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                        <span class="nav-text">Sair</span>
                    </li>
                </ul>
            </div>
            `;
    } else {
    sidebar.innerHTML += `
    <div class="sidenav">
                <ul>
                    <li onclick="pagVisaoGeral()" class="nav-item">
                        <i class="fa-solid fa-bars"></i>
                        <span class="nav-text">Visão Geral</span>
                    </li>
                    <li onclick="pagDash()" class="nav-item">
                        <i class="fa-solid fa-chart-line"></i>
                        <span class="nav-text">Dashboard</span>
                    </li>
                    <li onclick="sair()" class="nav-item">
                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                        <span class="nav-text">Sair</span>
                    </li>
                </ul>
            </div>
    `;
}


function pagVisaoGeral() {
    location.href = 'cards.html'
}

function pagDash() {
    location.href = 'dashboard.html'
}

function pagFunc() {
    location.href = 'cadastrofuncionario.html'
}

function pagSetor() {
    location.href = 'cadastroterreno.html'
}

function sair() {
    sessionStorage.clear()
    location.href = 'login.html'
}