// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(102, 126, 234, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)';
        navbar.style.backdropFilter = 'none';
    }
});

// Package booking functionality
document.querySelectorAll('.book-btn').forEach(button => {
    button.addEventListener('click', function() {
        const packageCard = this.closest('.package-card');
        const country = packageCard.dataset.country;
        const countryName = packageCard.querySelector('h3').textContent;
        const price = packageCard.querySelector('.price').textContent;
        const duration = packageCard.querySelector('.duration').textContent;
        
        // Show detailed package modal with itinerary
        showDetailedPackageModal(countryName, price, duration, country);
    });
});

// Booking modal function
function showBookingModal(country, price, duration) {
    // Create modal HTML
    const modalHTML = `
        <div class="modal-overlay" id="bookingModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Book ${country} Package</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="package-summary">
                        <p><strong>Package:</strong> ${country}</p>
                        <p><strong>Price:</strong> ${price}</p>
                        <p><strong>Duration:</strong> ${duration}</p>
                    </div>
                    <form class="booking-form-modal">
                        <div class="form-group">
                            <label for="modal-name">Full Name</label>
                            <input type="text" id="modal-name" required>
                        </div>
                        <div class="form-group">
                            <label for="modal-email">Email</label>
                            <input type="email" id="modal-email" required>
                        </div>
                        <div class="form-group">
                            <label for="modal-phone">Phone</label>
                            <input type="tel" id="modal-phone" required>
                        </div>
                        <div class="form-group">
                            <label for="modal-date">Preferred Travel Date</label>
                            <input type="date" id="modal-date" required>
                        </div>
                        <div class="form-group">
                            <label for="modal-guests">Number of Guests</label>
                            <select id="modal-guests" required>
                                <option value="">Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5+">5+</option>
                            </select>
                        </div>
                        <button type="submit" class="submit-booking">Confirm Booking</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles
    addModalStyles();
    
    // Event listeners for modal
    const modal = document.getElementById('bookingModal');
    const closeBtn = modal.querySelector('.close-modal');
    const form = modal.querySelector('.booking-form-modal');
    
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleBookingSubmission(form, country, price, duration);
    });
}

// Add enhanced modal styles for package details
function addEnhancedModalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .package-modal {
            max-width: 800px !important;
            width: 95% !important;
        }
        
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 1rem;
        }
        
        .summary-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem;
            background: white;
            border-radius: 8px;
            border: 1px solid #eee;
        }
        
        .summary-item i {
            color: #4CAF50;
            font-size: 1.2rem;
        }
        
        .itinerary-section {
            margin: 2rem 0;
        }
        
        .itinerary-section h4 {
            color: #333;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .itinerary-tabs {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
            border-bottom: 2px solid #eee;
        }
        
        .tab-btn {
            padding: 0.75rem 1.5rem;
            background: none;
            border: none;
            cursor: pointer;
            font-weight: 500;
            color: #666;
            border-bottom: 3px solid transparent;
            transition: all 0.3s ease;
        }
        
        .tab-btn.active {
            color: #4CAF50;
            border-bottom-color: #4CAF50;
        }
        
        .tab-content {
            display: none;
        }
        
        .tab-content.active {
            display: block;
        }
        
        .highlights-list {
            list-style: none;
            padding: 0;
        }
        
        .highlights-list li {
            padding: 0.5rem 0;
            border-bottom: 1px solid #eee;
            position: relative;
            padding-left: 1.5rem;
        }
        
        .highlights-list li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #4CAF50;
            font-weight: bold;
        }
        
        .day-item {
            margin-bottom: 1.5rem;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #4CAF50;
        }
        
        .day-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }
        
        .day-number {
            background: #4CAF50;
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-weight: bold;
        }
        
        .day-location {
            font-weight: 600;
            color: #333;
        }
        
        .day-activities ul {
            list-style: none;
            padding: 0;
        }
        
        .day-activities li {
            padding: 0.25rem 0;
            position: relative;
            padding-left: 1.5rem;
        }
        
        .day-activities li::before {
            content: '•';
            position: absolute;
            left: 0;
            color: #4CAF50;
            font-weight: bold;
        }
        
        .inclusions-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }
        
        .inclusion-category h5 {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
            color: #333;
        }
        
        .inclusion-category ul {
            list-style: none;
            padding: 0;
        }
        
        .inclusion-category li {
            padding: 0.25rem 0;
            position: relative;
            padding-left: 1.5rem;
        }
        
        .inclusion-category li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #4CAF50;
            font-weight: bold;
        }
        
        .inclusion-category:nth-child(2) li::before {
            content: '✗';
            color: #e53935;
        }
        
        .contact-section {
            margin: 2rem 0;
            padding: 1.5rem;
            background: #f8f9fa;
            border-radius: 10px;
        }
        
        .contact-section h4 {
            color: #333;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .contact-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
        }
        
        .contact-option {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            padding: 1rem;
            background: white;
            border-radius: 8px;
            border: 1px solid #eee;
        }
        
        .contact-option i {
            color: #4CAF50;
            font-size: 1.5rem;
            margin-top: 0.2rem;
        }
        
        .contact-option h5 {
            margin: 0 0 0.5rem 0;
            color: #2c3e50;
        }
        
        .contact-option p {
            margin: 0 0 0.25rem 0;
            font-weight: 600;
            color: #4CAF50;
        }
        
        .contact-option small {
            color: #666;
            font-size: 0.85rem;
        }
        
        .quick-inquiry-btn {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: background 0.3s ease;
        }
        
        .quick-inquiry-btn:hover {
            background: #2E7D32;
        }
        
        .action-buttons {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .book-now-btn, .download-itinerary-btn {
            flex: 1;
            padding: 1rem;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        
        .book-now-btn {
            background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
            color: white;
        }
        
        .download-itinerary-btn {
            background: #6c757d;
            color: white;
        }
        
        .book-now-btn:hover, .download-itinerary-btn:hover {
            transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
            .inclusions-grid {
                grid-template-columns: 1fr;
            }
            
            .action-buttons {
                flex-direction: column;
            }
            
            .summary-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
}

// Add modal styles
function addModalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        }
        
        .modal-content {
            background: white;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #eee;
        }
        
        .modal-header h3 {
            margin: 0;
            color: #333;
        }
        
        .close-modal {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }
        
        .modal-body {
            padding: 1.5rem;
        }
        
        .package-summary {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1.5rem;
        }
        
        .package-summary p {
            margin: 0.5rem 0;
        }
        
        .submit-booking {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        
        .submit-booking:hover {
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);
}

// Handle booking form submission
function handleBookingSubmission(form, country, price, duration) {
    const formData = new FormData(form);
    const name = form.querySelector('#modal-name').value;
    const email = form.querySelector('#modal-email').value;
    const phone = form.querySelector('#modal-phone').value;
    const date = form.querySelector('#modal-date').value;
    const guests = form.querySelector('#modal-guests').value;
    
    // Show success message
    showNotification(`Thank you ${name}! Your booking for ${country} has been submitted. We'll contact you at ${email} within 24 hours.`, 'success');
    
    // Close modal
    document.getElementById('bookingModal').remove();
    
    // Reset form
    form.reset();
}

// Show detailed package modal with itinerary
function showDetailedPackageModal(country, price, duration, countryCode) {
    // Get itinerary data based on country
    const itineraryData = getItineraryData(countryCode);
    
    // Create modal HTML
    const modalHTML = `
        <div class="modal-overlay" id="packageModal">
            <div class="modal-content package-modal">
                <div class="modal-header">
                    <h3>${country} Tour Package</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="package-summary">
                        <div class="summary-grid">
                            <div class="summary-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span><strong>Destination:</strong> ${country}</span>
                            </div>
                            <div class="summary-item">
                                <i class="fas fa-dollar-sign"></i>
                                <span><strong>Price:</strong> ${price}</span>
                            </div>
                            <div class="summary-item">
                                <i class="fas fa-calendar-alt"></i>
                                <span><strong>Duration:</strong> ${duration}</span>
                            </div>
                            <div class="summary-item">
                                <i class="fas fa-users"></i>
                                <span><strong>Group Size:</strong> 2-15 People</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="itinerary-section">
                        <h4><i class="fas fa-route"></i> Detailed Itinerary</h4>
                        <div class="itinerary-tabs">
                            <button class="tab-btn active" data-tab="overview">Overview</button>
                            <button class="tab-btn" data-tab="daywise">Day-wise Plan</button>
                            <button class="tab-btn" data-tab="inclusions">Inclusions</button>
                        </div>
                        
                        <div class="tab-content active" id="overview">
                            <div class="overview-content">
                                <h5>Package Highlights</h5>
                                <ul class="highlights-list">
                                    ${itineraryData.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                                </ul>
                                
                                <h5>What You'll Experience</h5>
                                <p>${itineraryData.description}</p>
                            </div>
                        </div>
                        
                        <div class="tab-content" id="daywise">
                            <div class="daywise-content">
                                ${itineraryData.itinerary.map((day, index) => `
                                    <div class="day-item">
                                        <div class="day-header">
                                            <span class="day-number">Day ${index + 1}</span>
                                            <span class="day-location">${day.location}</span>
                                        </div>
                                        <div class="day-activities">
                                            <ul>
                                                ${day.activities.map(activity => `<li>${activity}</li>`).join('')}
                                            </ul>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="tab-content" id="inclusions">
                            <div class="inclusions-content">
                                <div class="inclusions-grid">
                                    <div class="inclusion-category">
                                        <h5><i class="fas fa-check-circle"></i> What's Included</h5>
                                        <ul>
                                            ${itineraryData.inclusions.map(item => `<li>${item}</li>`).join('')}
                                        </ul>
                                    </div>
                                    <div class="inclusion-category">
                                        <h5><i class="fas fa-times-circle"></i> What's Not Included</h5>
                                        <ul>
                                            ${itineraryData.exclusions.map(item => `<li>${item}</li>`).join('')}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="contact-section">
                        <h4><i class="fas fa-phone"></i> Contact for Inquiry</h4>
                        <div class="contact-options">
                            <div class="contact-option">
                                <i class="fas fa-phone"></i>
                                <div>
                                    <h5>Call Us</h5>
                                    <p>9703335551</p>
                                    <small>Available 9:00 AM - 6:00 PM</small>
                                </div>
                            </div>
                            <div class="contact-option">
                                <i class="fas fa-envelope"></i>
                                <div>
                                    <h5>Email Us</h5>
                                    <p>info@apxgtravels.com</p>
                                    <small>Response within 24 hours</small>
                                </div>
                            </div>
                            <div class="contact-option">
                                <i class="fas fa-comments"></i>
                                <div>
                                    <h5>Quick Inquiry</h5>
                                    <button class="quick-inquiry-btn" onclick="showQuickInquiryForm('${country}', '${price}', '${duration}')">Send Quick Message</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="action-buttons">
                        <button class="book-now-btn" onclick="showBookingForm('${country}', '${price}', '${duration}')">
                            <i class="fas fa-calendar-check"></i> Book This Package
                        </button>
                        <button class="download-itinerary-btn" onclick="downloadItinerary('${country}')">
                            <i class="fas fa-download"></i> Download Itinerary
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add enhanced modal styles
    addEnhancedModalStyles();
    
    // Event listeners for modal
    const modal = document.getElementById('packageModal');
    const closeBtn = modal.querySelector('.close-modal');
    const tabBtns = modal.querySelectorAll('.tab-btn');
    
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Tab functionality
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            modal.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            btn.classList.add('active');
            modal.querySelector(`#${tabName}`).classList.add('active');
        });
    });
}

// Get itinerary data for each country
function getItineraryData(countryCode) {
    const itineraries = {
        thailand: {
            highlights: [
                "Explore Bangkok's Grand Palace and Wat Phra Kaew",
                "Relax on pristine Phuket beaches",
                "Visit ancient temples in Chiang Mai",
                "Experience floating markets and street food"
            ],
            description: "Discover the perfect blend of ancient traditions and modern luxury in Thailand. From the bustling streets of Bangkok to the serene beaches of Phuket, experience the warmth of Thai hospitality and rich cultural heritage.",
            itinerary: [
                {
                    location: "Bangkok",
                    activities: [
                        "Arrival and hotel check-in",
                        "Visit Grand Palace and Wat Phra Kaew",
                        "Explore Wat Arun (Temple of Dawn)",
                        "Evening street food tour in Chinatown"
                    ]
                },
                {
                    location: "Bangkok - Phuket",
                    activities: [
                        "Flight to Phuket",
                        "Check-in at beach resort",
                        "Relax on Patong Beach",
                        "Optional Phi Phi Island tour"
                    ]
                },
                {
                    location: "Phuket",
                    activities: [
                        "Full day beach activities",
                        "Water sports (optional)",
                        "Visit Big Buddha statue",
                        "Evening at Phuket Old Town"
                    ]
                },
                {
                    location: "Phuket - Chiang Mai",
                    activities: [
                        "Flight to Chiang Mai",
                        "Visit Doi Suthep Temple",
                        "Explore Old City and Night Bazaar",
                        "Traditional Thai massage"
                    ]
                },
                {
                    location: "Chiang Mai",
                    activities: [
                        "Visit Elephant Nature Park",
                        "Doi Inthanon National Park",
                        "Cooking class and market tour",
                        "Farewell dinner with cultural show"
                    ]
                }
            ],
            inclusions: [
                "All airport transfers",
                "4-star hotel accommodation",
                "Daily breakfast",
                "English speaking guide",
                "All entrance fees",
                "Internal flights (Bangkok-Phuket-Chiang Mai)"
            ],
            exclusions: [
                "International flights",
                "Lunch and dinner (except breakfast)",
                "Personal expenses",
                "Optional activities",
                "Travel insurance"
            ]
        },
        singapore: {
            highlights: [
                "Marvel at Marina Bay Sands architecture",
                "Explore Gardens by the Bay",
                "Visit Sentosa Island attractions",
                "Experience diverse cultures in Chinatown & Little India"
            ],
            description: "Experience the perfect fusion of nature and urban innovation in Singapore. From iconic skyscrapers to lush gardens, discover why Singapore is called the 'Garden City' of Asia.",
            itinerary: [
                {
                    location: "Singapore",
                    activities: [
                        "Arrival and hotel check-in",
                        "Visit Marina Bay Sands",
                        "Explore Gardens by the Bay",
                        "Evening light show at Supertree Grove"
                    ]
                },
                {
                    location: "Singapore",
                    activities: [
                        "Full day at Sentosa Island",
                        "Visit Universal Studios (optional)",
                        "Beach time at Tanjong Beach",
                        "Cable car experience"
                    ]
                },
                {
                    location: "Singapore",
                    activities: [
                        "Chinatown heritage tour",
                        "Little India exploration",
                        "Shopping at Orchard Road",
                        "Night Safari adventure"
                    ]
                }
            ],
            inclusions: [
                "Airport transfers",
                "3-star hotel accommodation",
                "Daily breakfast",
                "Sentosa Island pass",
                "All entrance fees",
                "Public transport card"
            ],
            exclusions: [
                "International flights",
                "Universal Studios tickets",
                "Lunch and dinner",
                "Personal expenses",
                "Optional activities"
            ]
        },
        malaysia: {
            highlights: [
                "Explore Kuala Lumpur's iconic Petronas Towers",
                "Visit historic Batu Caves",
                "Relax on Langkawi's pristine beaches",
                "Experience Cameron Highlands tea plantations"
            ],
            description: "Journey through Malaysia's diverse landscapes, from the modern skyline of Kuala Lumpur to the natural beauty of Langkawi and the cool climate of Cameron Highlands.",
            itinerary: [
                {
                    location: "Kuala Lumpur",
                    activities: [
                        "Arrival and hotel check-in",
                        "Visit Petronas Towers",
                        "Explore Batu Caves",
                        "Evening at KL Tower"
                    ]
                },
                {
                    location: "Kuala Lumpur",
                    activities: [
                        "Visit National Mosque",
                        "Explore Merdeka Square",
                        "Shopping at Bukit Bintang",
                        "Petaling Street night market"
                    ]
                },
                {
                    location: "Langkawi",
                    activities: [
                        "Flight to Langkawi",
                        "Check-in at beach resort",
                        "Cable car to Mount Mat Cincang",
                        "Beach relaxation"
                    ]
                },
                {
                    location: "Langkawi - Cameron Highlands",
                    activities: [
                        "Visit Langkawi Sky Bridge",
                        "Flight to Cameron Highlands",
                        "Tea plantation tour",
                        "Strawberry farm visit"
                    ]
                }
            ],
            inclusions: [
                "All airport transfers",
                "3-4 star hotel accommodation",
                "Daily breakfast",
                "English speaking guide",
                "All entrance fees",
                "Internal flights"
            ],
            exclusions: [
                "International flights",
                "Lunch and dinner",
                "Personal expenses",
                "Optional activities",
                "Travel insurance"
            ]
        },
        vietnam: {
            highlights: [
                "Explore Hanoi's Old Quarter",
                "Cruise through Ha Long Bay",
                "Discover Ho Chi Minh City",
                "Experience Mekong Delta life"
            ],
            description: "Immerse yourself in Vietnam's rich history and stunning landscapes. From the charming streets of Hanoi to the majestic Ha Long Bay, experience the authentic culture and delicious cuisine.",
            itinerary: [
                {
                    location: "Hanoi",
                    activities: [
                        "Arrival and hotel check-in",
                        "Visit Ho Chi Minh Mausoleum",
                        "Explore Old Quarter",
                        "Evening water puppet show"
                    ]
                },
                {
                    location: "Hanoi - Ha Long Bay",
                    activities: [
                        "Transfer to Ha Long Bay",
                        "Board cruise ship",
                        "Kayaking and swimming",
                        "Sunset party on deck"
                    ]
                },
                {
                    location: "Ha Long Bay",
                    activities: [
                        "Tai Chi on sundeck",
                        "Visit Sung Sot Cave",
                        "Cooking class on board",
                        "Fishing village visit"
                    ]
                },
                {
                    location: "Ha Long Bay - Ho Chi Minh City",
                    activities: [
                        "Return to Hanoi",
                        "Flight to Ho Chi Minh City",
                        "City orientation tour",
                        "Ben Thanh Market"
                    ]
                }
            ],
            inclusions: [
                "All airport transfers",
                "3-4 star hotel accommodation",
                "Daily breakfast",
                "Ha Long Bay cruise",
                "English speaking guide",
                "All entrance fees"
            ],
            exclusions: [
                "International flights",
                "Lunch and dinner",
                "Personal expenses",
                "Optional activities",
                "Travel insurance"
            ]
        },
        cambodia: {
            highlights: [
                "Explore magnificent Angkor Wat",
                "Visit ancient temples of Siem Reap",
                "Discover Phnom Penh's history",
                "Experience Tonle Sap Lake"
            ],
            description: "Step back in time to explore the ancient Khmer Empire. From the world-famous Angkor Wat to the charming streets of Siem Reap, discover Cambodia's rich cultural heritage.",
            itinerary: [
                {
                    location: "Siem Reap",
                    activities: [
                        "Arrival and hotel check-in",
                        "Visit Angkor Wat at sunrise",
                        "Explore Bayon Temple",
                        "Evening at Pub Street"
                    ]
                },
                {
                    location: "Siem Reap",
                    activities: [
                        "Visit Ta Prohm Temple",
                        "Explore Angkor Thom",
                        "Traditional Apsara dance show",
                        "Local market visit"
                    ]
                },
                {
                    location: "Siem Reap - Phnom Penh",
                    activities: [
                        "Transfer to Phnom Penh",
                        "Visit Royal Palace",
                        "Explore Tuol Sleng Museum",
                        "Evening river cruise"
                    ]
                }
            ],
            inclusions: [
                "All airport transfers",
                "3-star hotel accommodation",
                "Daily breakfast",
                "Angkor Wat pass",
                "English speaking guide",
                "All entrance fees"
            ],
            exclusions: [
                "International flights",
                "Lunch and dinner",
                "Personal expenses",
                "Optional activities",
                "Travel insurance"
            ]
        }
    };
    
    return itineraries[countryCode] || itineraries.thailand;
}

// Show quick inquiry form
function showQuickInquiryForm(country, price, duration) {
    const modalHTML = `
        <div class="modal-overlay" id="quickInquiryModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Quick Inquiry - ${country} Package</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="package-summary">
                        <p><strong>Package:</strong> ${country}</p>
                        <p><strong>Price:</strong> ${price}</p>
                        <p><strong>Duration:</strong> ${duration}</p>
                    </div>
                    <form class="quick-inquiry-form">
                        <div class="form-group">
                            <label for="quick-name">Full Name *</label>
                            <input type="text" id="quick-name" required>
                        </div>
                        <div class="form-group">
                            <label for="quick-email">Email *</label>
                            <input type="email" id="quick-email" required>
                        </div>
                        <div class="form-group">
                            <label for="quick-phone">Phone</label>
                            <input type="tel" id="quick-phone">
                        </div>
                        <div class="form-group">
                            <label for="quick-message">Your Inquiry *</label>
                            <textarea id="quick-message" rows="4" placeholder="Tell us what you'd like to know about this package..." required></textarea>
                        </div>
                        <button type="submit" class="submit-btn">Send Inquiry</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('quickInquiryModal');
    const closeBtn = modal.querySelector('.close-modal');
    const form = modal.querySelector('.quick-inquiry-form');
    
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.querySelector('#quick-name').value;
        const email = form.querySelector('#quick-email').value;
        const phone = form.querySelector('#quick-phone').value;
        const message = form.querySelector('#quick-message').value;
        
        showNotification(`Thank you ${name}! Your inquiry about ${country} package has been sent. We'll respond within 24 hours.`, 'success');
        modal.remove();
    });
}

// Show booking form
function showBookingForm(country, price, duration) {
    const modalHTML = `
        <div class="modal-overlay" id="bookingFormModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Book ${country} Package</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="package-summary">
                        <p><strong>Package:</strong> ${country}</p>
                        <p><strong>Price:</strong> ${price}</p>
                        <p><strong>Duration:</strong> ${duration}</p>
                    </div>
                    <form class="booking-form-modal">
                        <div class="form-group">
                            <label for="modal-name">Full Name *</label>
                            <input type="text" id="modal-name" required>
                        </div>
                        <div class="form-group">
                            <label for="modal-email">Email *</label>
                            <input type="email" id="modal-email" required>
                        </div>
                        <div class="form-group">
                            <label for="modal-phone">Phone *</label>
                            <input type="tel" id="modal-phone" required>
                        </div>
                        <div class="form-group">
                            <label for="modal-date">Preferred Travel Date *</label>
                            <input type="date" id="modal-date" required>
                        </div>
                        <div class="form-group">
                            <label for="modal-guests">Number of Guests *</label>
                            <select id="modal-guests" required>
                                <option value="">Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5+">5+</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="modal-special">Special Requirements</label>
                            <textarea id="modal-special" rows="3" placeholder="Any special requests or requirements..."></textarea>
                        </div>
                        <button type="submit" class="submit-booking">Confirm Booking</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('bookingFormModal');
    const closeBtn = modal.querySelector('.close-modal');
    const form = modal.querySelector('.booking-form-modal');
    
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.querySelector('#modal-name').value;
        const email = form.querySelector('#modal-email').value;
        const phone = form.querySelector('#modal-phone').value;
        const date = form.querySelector('#modal-date').value;
        const guests = form.querySelector('#modal-guests').value;
        const special = form.querySelector('#modal-special').value;
        
        showNotification(`Thank you ${name}! Your booking for ${country} has been submitted. We'll contact you at ${email} within 24 hours to confirm details.`, 'success');
        modal.remove();
    });
}

// Download itinerary function
function downloadItinerary(country) {
    showNotification(`Itinerary for ${country} package is being prepared for download. Check your email shortly!`, 'info');
}

// Ticket booking form functionality
document.querySelector('.search-btn').addEventListener('click', function(e) {
    e.preventDefault();
    const form = this.closest('.booking-form');
    const tripType = form.querySelector('#trip-type').value;
    const from = form.querySelector('#from').value;
    const to = form.querySelector('#to').value;
    const departure = form.querySelector('#departure').value;
    const returnDate = form.querySelector('#return').value;
    const passengers = form.querySelector('#passengers').value;
    const classType = form.querySelector('#class').value;
    
    if (!tripType || !from || !to || !departure || !passengers || !classType) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    if (tripType === 'round-trip' && !returnDate) {
        showNotification('Please select return date for round trip.', 'error');
        return;
    }
    
    // Simulate search
    showNotification('Searching for flights...', 'info');
    
    // Simulate results after delay
    setTimeout(() => {
        showNotification(`Found flights from ${from} to ${to} on ${departure}. Check your email for detailed results.`, 'success');
    }, 2000);
});

// Contact form functionality
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.querySelector('#name').value;
    const email = this.querySelector('#email').value;
    const phone = this.querySelector('#phone').value;
    const message = this.querySelector('#message').value;
    
    if (!name || !email || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Sending message...', 'info');
    
    setTimeout(() => {
        showNotification(`Thank you ${name}! Your message has been sent successfully. We'll get back to you at ${email} within 24 hours.`, 'success');
        this.reset();
    }, 1500);
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        addNotificationStyles();
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        hideNotification(notification);
    });
}

// Hide notification
function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// Add notification styles
function addNotificationStyles() {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 10001;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;
        }
        
        .notification-message {
            flex: 1;
            margin-right: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            color: #666;
        }
        
        .notification-info {
            border-left: 4px solid #4CAF50;
        }
        
        .notification-success {
            border-left: 4px solid #4CAF50;
        }
        
        .notification-error {
            border-left: 4px solid #e53935;
        }
    `;
    document.head.appendChild(style);
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.package-card, .feature, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Set minimum date for departure and return fields
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    const departureInput = document.getElementById('departure');
    const returnInput = document.getElementById('return');
    
    if (departureInput) {
        departureInput.min = today;
    }
    
    if (returnInput) {
        returnInput.min = today;
    }
    
    // Update return date minimum when departure date changes
    if (departureInput && returnInput) {
        departureInput.addEventListener('change', () => {
            returnInput.min = departureInput.value;
        });
    }
});

// Add loading animation for buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('loading')) return;
            
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.classList.add('loading');
            
            // Reset button after animation
            setTimeout(() => {
                this.textContent = originalText;
                this.classList.remove('loading');
            }, 2000);
        });
    });
});

// Add button loading styles
const buttonStyles = document.createElement('style');
buttonStyles.textContent = `
    button.loading {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    button.loading:hover {
        transform: none !important;
    }
`;
document.head.appendChild(buttonStyles);

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    console.log('Apex Global Travel website loaded successfully!');
    
    // Add some interactive features
    addParallaxEffect();
    addTypingEffect();
});

// Parallax effect for hero section
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Typing effect for hero title
function addTypingEffect() {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
}
