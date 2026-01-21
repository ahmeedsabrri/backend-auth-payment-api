const API_URL = 'http://localhost:5000/api';

// State
let token = localStorage.getItem('token');
let user = JSON.parse(localStorage.getItem('user'));

// DOM Elements
const navLoginBtn = document.getElementById('nav-login-btn');
const navRegisterBtn = document.getElementById('nav-register-btn');
const navLogoutBtn = document.getElementById('nav-logout-btn');

const authSection = document.getElementById('auth-section');
const dashboardSection = document.getElementById('dashboard-section');

const loginFormContainer = document.getElementById('login-form-container');
const registerFormContainer = document.getElementById('register-form-container');

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const paymentForm = document.getElementById('payment-form');

const userNameDisplay = document.getElementById('user-name');
const userRoleDisplay = document.getElementById('user-role');
const transactionList = document.getElementById('transaction-list');

// Init
function init() {
    if (token && user) {
        showDashboard();
    } else {
        showAuth('login');
    }
}

// Navigation
navLoginBtn.addEventListener('click', () => showAuth('login'));
navRegisterBtn.addEventListener('click', () => showAuth('register'));
navLogoutBtn.addEventListener('click', logout);

function showAuth(type) {
    authSection.classList.add('active');
    authSection.classList.remove('hidden');
    dashboardSection.classList.add('hidden');
    dashboardSection.classList.remove('active');

    navLogoutBtn.classList.add('hidden');
    navLoginBtn.classList.remove('hidden');
    navRegisterBtn.classList.remove('hidden');

    if (type === 'login') {
        loginFormContainer.classList.remove('hidden');
        registerFormContainer.classList.add('hidden');
        navLoginBtn.classList.add('active');
        navRegisterBtn.classList.remove('active');
    } else {
        loginFormContainer.classList.add('hidden');
        registerFormContainer.classList.remove('hidden');
        navLoginBtn.classList.remove('active');
        navRegisterBtn.classList.add('active');
    }
}

function showDashboard() {
    authSection.classList.add('hidden');
    authSection.classList.remove('active');
    dashboardSection.classList.add('active');
    dashboardSection.classList.remove('hidden');

    navLogoutBtn.classList.remove('hidden');
    navLoginBtn.classList.add('hidden');
    navRegisterBtn.classList.add('hidden');

    userNameDisplay.textContent = user.username;
    userRoleDisplay.textContent = user.role;

    fetchTransactions();
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    token = null;
    user = null;
    showAuth('login');
    showToast('Logged out successfully');
}

// Auth Actions
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();

        if (res.ok) {
            token = data.token;
            user = { username: data.username, role: data.role, email: data.email };
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            showDashboard();
            showToast('Login successful');
        } else {
            showToast(data.message || 'Login failed', 'error');
        }
    } catch (err) {
        showToast('Network error', 'error');
    }
});

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const role = document.getElementById('reg-role').value;

    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, role }),
        });
        const data = await res.json();

        if (res.ok) {
            token = data.token;
            user = { username: data.username, role: data.role, email: data.email };
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            showDashboard();
            showToast('Account created successfully');
        } else {
            showToast(data.message || 'Registration failed', 'error');
        }
    } catch (err) {
        showToast('Network error', 'error');
    }
});

// Payment Actions
paymentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = document.getElementById('pay-amount').value;

    try {
        const res = await fetch(`${API_URL}/payments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ amount: Number(amount), currency: 'USD' }),
        });
        const data = await res.json();

        if (res.ok) {
            showToast('Payment successful');
            fetchTransactions();
        } else {
            showToast(data.message || 'Payment failed', 'error');
        }
    } catch (err) {
        showToast('Network error', 'error');
    }
});

async function fetchTransactions() {
    try {
        const res = await fetch(`${API_URL}/payments`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();

        if (res.ok) {
            renderTransactions(data);
        }
    } catch (err) {
        console.error('Error fetching transactions', err);
    }
}

function renderTransactions(transactions) {
    transactionList.innerHTML = '';
    if (transactions.length === 0) {
        transactionList.innerHTML = '<div class="empty-state">No transactions yet.</div>';
        return;
    }

    transactions.forEach(t => {
        const div = document.createElement('div');
        div.className = 'transaction-item';
        div.innerHTML = `
            <div>
                <div style="font-weight: 500;">Payment</div>
                <div class="t-date">${new Date(t.createdAt).toLocaleDateString()}</div>
            </div>
            <div class="t-amount">$${t.amount}</div>
        `;
        transactionList.appendChild(div);
    });
}

// Toast
function showToast(msg, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.style.borderColor = type === 'error' ? 'var(--error)' : 'var(--success)';
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

init();
