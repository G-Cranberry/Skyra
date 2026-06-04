// Initialize Icons on load
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});

// State
let currentRole = null;
let selectedLoginRole = null;

// --- Login & Navigation Logic ---

function selectRole(role) {
    selectedLoginRole = role;
    const formContainer = document.getElementById('login-form-container');
    const badge = document.getElementById('selected-role-badge');
    
    // Update Badge
    badge.textContent = role === 'passenger' ? 'Passenger Login' : 'Crew / Staff Login';
    badge.className = `role-badge ${role}-badge`;
    
    // Show Form
    formContainer.classList.remove('hidden');
    
    // Smooth scroll to form on mobile
    if(window.innerWidth < 768) {
        formContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

function closeLoginForm() {
    document.getElementById('login-form-container').classList.add('hidden');
    selectedLoginRole = null;
}

function handleLogin(event) {
    event.preventDefault();
    if(selectedLoginRole) {
        loginAs(selectedLoginRole);
    }
}

function loginAs(role) {
    currentRole = role;
    
    // Hide Login View
    document.getElementById('login-view').classList.remove('active');
    setTimeout(() => {
        document.getElementById('login-view').classList.add('hidden');
        
        // Show target dashboard
        const targetView = role === 'passenger' ? 'passenger-view' : 'crew-view';
        const viewEl = document.getElementById(targetView);
        viewEl.classList.remove('hidden');
        
        // Force reflow
        void viewEl.offsetWidth;
        
        viewEl.classList.add('active');
        lucide.createIcons();
    }, 400); // Wait for fade out
}

function logout() {
    currentRole = null;
    selectedLoginRole = null;
    
    // Hide all dashboards
    document.getElementById('passenger-view').classList.remove('active');
    document.getElementById('crew-view').classList.remove('active');
    
    setTimeout(() => {
        document.getElementById('passenger-view').classList.add('hidden');
        document.getElementById('crew-view').classList.add('hidden');
        
        // Close form just in case
        closeLoginForm();
        
        // Show login
        const loginEl = document.getElementById('login-view');
        loginEl.classList.remove('hidden');
        void loginEl.offsetWidth;
        loginEl.classList.add('active');
    }, 400);
}

// --- Dashboard Shared Logic ---

function switchTab(tabId, btnEl) {
    // Find parent container (tabs)
    const tabsContainer = btnEl.parentElement;
    
    // Remove active class from all buttons in this tab group
    const buttons = tabsContainer.querySelectorAll('.tab-btn');
    buttons.forEach(b => b.classList.remove('active'));
    
    // Add active to clicked
    btnEl.classList.add('active');
    
    // Find dashboard container to scope tab content search
    const dashContainer = tabsContainer.parentElement;
    
    // Hide all tab contents in this dashboard
    const contents = dashContainer.querySelectorAll('.tab-content');
    contents.forEach(c => c.classList.add('hidden'));
    contents.forEach(c => c.classList.remove('active'));
    
    // Show target
    const target = document.getElementById(tabId);
    if(target) {
        target.classList.remove('hidden');
        void target.offsetWidth;
        target.classList.add('active');
    }
}

// --- Passenger Dashboard Logic ---

function sendChatMessage() {
    const inputEl = document.getElementById('chat-input');
    const msg = inputEl.value.trim();
    if(!msg) return;
    
    const chatContainer = document.getElementById('chat-messages');
    
    // Append User Message
    const userDiv = document.createElement('div');
    userDiv.className = 'chat-message user';
    userDiv.innerHTML = `
        <i data-lucide="user"></i>
        <div class="message-bubble">${escapeHTML(msg)}</div>
    `;
    chatContainer.appendChild(userDiv);
    
    inputEl.value = '';
    lucide.createIcons();
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    // Simulate AI Response
    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'chat-message bot';
        
        // Simple keyword logic for demo
        let response = "Based on DGCA/EU regulations, you may be entitled to compensation. Please provide your flight number for specific details.";
        if(msg.toLowerCase().includes('delay') && msg.includes('3')) {
            response = "For a 3+ hour delay, you are entitled to meals, refreshments, and potentially up to $400/₹30,000 depending on the flight distance, plus a full refund if you choose not to fly.";
        }
        
        botDiv.innerHTML = `
            <i data-lucide="bot"></i>
            <div class="message-bubble">${response}</div>
        `;
        chatContainer.appendChild(botDiv);
        lucide.createIcons();
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 1000);
}

function simulateTracking() {
    const res = document.getElementById('tracker-result');
    res.classList.remove('hidden');
    // Re-trigger icon render
    lucide.createIcons();
}

function simulateSafetyCheck() {
    const res = document.getElementById('safety-result');
    res.classList.remove('hidden');
    lucide.createIcons();
    
    // Trigger gauge animation
    setTimeout(() => {
        const fill = res.querySelector('.gauge-fill');
        if(fill) {
            // Dasharray is ~125. Setting offset to ~110 means small fill (Low risk)
            fill.style.strokeDashoffset = '110'; 
        }
    }, 100);
}

// --- Crew Dashboard Logic ---

function calculateFatigue() {
    const res = document.getElementById('fatigue-result');
    res.classList.remove('hidden');
    lucide.createIcons();
}

function analyzeDuty() {
    const res = document.getElementById('duty-timeline');
    res.classList.remove('hidden');
    lucide.createIcons();
}

// Utility
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}
