// Medical Dashboard JavaScript
class MedicalDashboard {
    constructor() {
        this.reports = [];
        this.alerts = [];
        this.charts = {};
        
        this.initializeData();
        this.initializeEventListeners();
        this.initializeCharts();
        this.renderReports();
        this.renderAlerts();
    }

    // Initialize sample medical data
    initializeData() {
        // Sample medical reports
        this.reports = [
            {
                id: 1,
                patientName: "Sarah Johnson",
                patientId: "P001",
                reportType: "blood-test",
                diagnosis: "Type 2 Diabetes",
                reportText: "Patient presents with elevated glucose levels (HbA1c: 8.2%). Fasting glucose: 165 mg/dL. Recommended immediate dietary modifications and metformin therapy. Follow-up in 4 weeks to monitor response to treatment.",
                severity: "high",
                date: "2024-01-15",
                doctor: "Dr. Smith"
            },
            {
                id: 2,
                patientName: "Michael Chen",
                patientId: "P002",
                reportType: "x-ray",
                diagnosis: "Fractured Radius",
                reportText: "X-ray reveals a displaced fracture of the distal radius. Patient reports fall on outstretched hand. Recommend orthopedic consultation and immobilization with cast. Pain management with NSAIDs.",
                severity: "medium",
                date: "2024-01-14",
                doctor: "Dr. Williams"
            },
            {
                id: 3,
                patientName: "Emma Davis",
                patientId: "P003",
                reportType: "mri",
                diagnosis: "Herniated Disc L4-L5",
                reportText: "MRI shows significant disc herniation at L4-L5 level with nerve root compression. Patient experiencing severe lower back pain and left leg numbness. Conservative treatment recommended initially with physical therapy and pain management.",
                severity: "high",
                date: "2024-01-13",
                doctor: "Dr. Johnson"
            },
            {
                id: 4,
                patientName: "Robert Wilson",
                patientId: "P004",
                reportType: "consultation",
                diagnosis: "Hypertension",
                reportText: "Routine follow-up for hypertension management. Blood pressure: 142/88 mmHg. Patient compliant with medication (Lisinopril 10mg daily). Recommend lifestyle modifications including reduced sodium intake and regular exercise.",
                severity: "medium",
                date: "2024-01-12",
                doctor: "Dr. Brown"
            },
            {
                id: 5,
                patientName: "Lisa Anderson",
                patientId: "P005",
                reportType: "ct-scan",
                diagnosis: "Pulmonary Embolism",
                reportText: "CT pulmonary angiogram reveals multiple bilateral pulmonary emboli. Patient presented with acute shortness of breath and chest pain. Immediate anticoagulation initiated. ICU monitoring required.",
                severity: "critical",
                date: "2024-01-11",
                doctor: "Dr. Martinez"
            },
            {
                id: 6,
                patientName: "David Thompson",
                patientId: "P006",
                reportType: "blood-test",
                diagnosis: "Anemia",
                reportText: "Complete blood count shows microcytic anemia (Hgb: 9.2 g/dL, MCV: 72 fL). Iron studies indicate iron deficiency. Recommend iron supplementation and investigation for underlying cause of blood loss.",
                severity: "medium",
                date: "2024-01-10",
                doctor: "Dr. Lee"
            }
        ];

        // Sample alerts
        this.alerts = [
            {
                id: 1,
                type: "critical",
                title: "Critical Lab Values",
                message: "Patient P005 - Troponin levels critically elevated",
                time: "5 minutes ago"
            },
            {
                id: 2,
                type: "warning",
                title: "Medication Alert",
                message: "Patient P001 - Metformin dosage adjustment needed",
                time: "15 minutes ago"
            },
            {
                id: 3,
                type: "info",
                title: "Appointment Reminder",
                message: "Dr. Smith - 3 patients scheduled for tomorrow",
                time: "1 hour ago"
            },
            {
                id: 4,
                type: "warning",
                title: "Equipment Maintenance",
                message: "MRI Machine #2 scheduled for maintenance",
                time: "2 hours ago"
            }
        ];
    }

    // Initialize event listeners
    initializeEventListeners() {
        // Modal controls
        const addReportBtn = document.getElementById('addReportBtn');
        const reportModal = document.getElementById('reportModal');
        const closeModal = document.getElementById('closeModal');
        const cancelBtn = document.getElementById('cancelBtn');
        const reportForm = document.getElementById('reportForm');

        addReportBtn.addEventListener('click', () => this.openModal());
        closeModal.addEventListener('click', () => this.closeModal());
        cancelBtn.addEventListener('click', () => this.closeModal());
        reportForm.addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Close modal when clicking outside
        reportModal.addEventListener('click', (e) => {
            if (e.target === reportModal) {
                this.closeModal();
            }
        });

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));

        // Navigation
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => this.handleNavigation(item));
        });
    }

    // Initialize charts
    initializeCharts() {
        this.initializeDemographicsChart();
        this.initializeDiagnosisChart();
        this.initializeTrendsChart();
    }

    // Demographics Chart
    initializeDemographicsChart() {
        const ctx = document.getElementById('demographicsChart').getContext('2d');
        this.charts.demographics = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Male', 'Female', 'Other'],
                datasets: [{
                    data: [45, 52, 3],
                    backgroundColor: [
                        '#2563eb',
                        '#0d9488',
                        '#059669'
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }

    // Diagnosis Chart
    initializeDiagnosisChart() {
        const ctx = document.getElementById('diagnosisChart').getContext('2d');
        this.charts.diagnosis = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Diabetes', 'Hypertension', 'Fractures', 'Respiratory', 'Cardiac', 'Neurological'],
                datasets: [{
                    label: 'Cases',
                    data: [85, 120, 45, 67, 34, 28],
                    backgroundColor: '#2563eb',
                    borderRadius: 6,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#f3f4f6'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Trends Chart
    initializeTrendsChart() {
        const ctx = document.getElementById('trendsChart').getContext('2d');
        this.charts.trends = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'New Patients',
                        data: [120, 135, 145, 160, 155, 170],
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Critical Cases',
                        data: [15, 18, 12, 20, 16, 23],
                        borderColor: '#dc2626',
                        backgroundColor: 'rgba(220, 38, 38, 0.1)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#f3f4f6'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Render reports
    renderReports() {
        const container = document.getElementById('reportsContainer');
        container.innerHTML = '';

        this.reports.forEach(report => {
            const reportCard = this.createReportCard(report);
            container.appendChild(reportCard);
        });
    }

    // Create report card element
    createReportCard(report) {
        const card = document.createElement('div');
        card.className = 'report-card';
        card.innerHTML = `
            <div class="report-header">
                <div class="report-info">
                    <h3>${report.patientName}</h3>
                    <div class="report-meta">
                        <span><i class="fas fa-id-card"></i> ${report.patientId}</span>
                        <span><i class="fas fa-calendar"></i> ${this.formatDate(report.date)}</span>
                        <span><i class="fas fa-user-md"></i> ${report.doctor}</span>
                        <span><i class="fas fa-file-medical"></i> ${this.formatReportType(report.reportType)}</span>
                    </div>
                </div>
                <span class="severity-badge severity-${report.severity}">${report.severity}</span>
            </div>
            <div class="report-content">
                <div class="report-diagnosis">
                    <strong>Diagnosis:</strong> ${report.diagnosis}
                </div>
                <div class="report-text">
                    ${report.reportText}
                </div>
            </div>
        `;
        return card;
    }

    // Render alerts
    renderAlerts() {
        const container = document.getElementById('alertsContainer');
        container.innerHTML = '';

        this.alerts.forEach(alert => {
            const alertCard = this.createAlertCard(alert);
            container.appendChild(alertCard);
        });
    }

    // Create alert card element
    createAlertCard(alert) {
        const card = document.createElement('div');
        card.className = `alert-card ${alert.type}`;
        
        const iconMap = {
            critical: 'fas fa-exclamation-triangle',
            warning: 'fas fa-exclamation-circle',
            info: 'fas fa-info-circle'
        };

        card.innerHTML = `
            <div class="alert-icon">
                <i class="${iconMap[alert.type]}"></i>
            </div>
            <div class="alert-content">
                <h4>${alert.title}</h4>
                <p>${alert.message}</p>
            </div>
            <div class="alert-time">${alert.time}</div>
        `;
        return card;
    }

    // Modal functions
    openModal() {
        const modal = document.getElementById('reportModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('reportModal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        this.resetForm();
    }

    resetForm() {
        const form = document.getElementById('reportForm');
        form.reset();
    }

    // Handle form submission
    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const newReport = {
            id: this.reports.length + 1,
            patientName: document.getElementById('patientName').value,
            patientId: document.getElementById('patientId').value,
            reportType: document.getElementById('reportType').value,
            diagnosis: document.getElementById('diagnosis').value,
            reportText: document.getElementById('reportText').value,
            severity: document.getElementById('severity').value,
            date: new Date().toISOString().split('T')[0],
            doctor: "Dr. Smith" // Current user
        };

        this.reports.unshift(newReport);
        this.renderReports();
        this.closeModal();
        this.showNotification('Report added successfully!', 'success');
        this.updateStats();
    }

    // Handle search
    handleSearch(query) {
        const filteredReports = this.reports.filter(report => 
            report.patientName.toLowerCase().includes(query.toLowerCase()) ||
            report.patientId.toLowerCase().includes(query.toLowerCase()) ||
            report.diagnosis.toLowerCase().includes(query.toLowerCase()) ||
            report.reportText.toLowerCase().includes(query.toLowerCase())
        );

        this.renderFilteredReports(filteredReports);
    }

    // Render filtered reports
    renderFilteredReports(reports) {
        const container = document.getElementById('reportsContainer');
        container.innerHTML = '';

        if (reports.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--gray-500);">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>No reports found matching your search.</p>
                </div>
            `;
            return;
        }

        reports.forEach(report => {
            const reportCard = this.createReportCard(report);
            container.appendChild(reportCard);
        });
    }

    // Handle navigation
    handleNavigation(clickedItem) {
        // Remove active class from all items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to clicked item
        clickedItem.classList.add('active');
        
        // Here you could implement different views based on navigation
        const section = clickedItem.querySelector('span').textContent;
        console.log(`Navigating to: ${section}`);
    }

    // Utility functions
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    formatReportType(type) {
        const typeMap = {
            'blood-test': 'Blood Test',
            'x-ray': 'X-Ray',
            'mri': 'MRI Scan',
            'ct-scan': 'CT Scan',
            'consultation': 'Consultation',
            'surgery': 'Surgery Report'
        };
        return typeMap[type] || type;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--success)' : 'var(--info)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    updateStats() {
        // Update statistics based on current data
        const totalPatients = new Set(this.reports.map(r => r.patientId)).size;
        const totalReports = this.reports.length;
        const criticalCases = this.reports.filter(r => r.severity === 'critical').length;
        const resolvedCases = Math.floor(totalReports * 0.7); // Simulate resolved cases

        // Update DOM elements
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length >= 4) {
            statNumbers[0].textContent = totalPatients.toLocaleString();
            statNumbers[1].textContent = totalReports.toLocaleString();
            statNumbers[2].textContent = criticalCases.toString();
            statNumbers[3].textContent = resolvedCases.toString();
        }
    }

    // Generate insights from medical reports
    generateInsights() {
        const insights = {
            commonDiagnoses: this.getCommonDiagnoses(),
            severityDistribution: this.getSeverityDistribution(),
            monthlyTrends: this.getMonthlyTrends(),
            patientDemographics: this.getPatientDemographics()
        };

        return insights;
    }

    getCommonDiagnoses() {
        const diagnoses = {};
        this.reports.forEach(report => {
            diagnoses[report.diagnosis] = (diagnoses[report.diagnosis] || 0) + 1;
        });

        return Object.entries(diagnoses)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([diagnosis, count]) => ({ diagnosis, count }));
    }

    getSeverityDistribution() {
        const distribution = { low: 0, medium: 0, high: 0, critical: 0 };
        this.reports.forEach(report => {
            distribution[report.severity]++;
        });
        return distribution;
    }

    getMonthlyTrends() {
        // Simulate monthly trends data
        return {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            newPatients: [120, 135, 145, 160, 155, 170],
            criticalCases: [15, 18, 12, 20, 16, 23]
        };
    }

    getPatientDemographics() {
        // Simulate demographic data
        return {
            ageGroups: {
                '0-18': 15,
                '19-35': 25,
                '36-50': 30,
                '51-65': 20,
                '65+': 10
            },
            gender: {
                male: 45,
                female: 52,
                other: 3
            }
        };
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new MedicalDashboard();
    
    // Make dashboard globally accessible for debugging
    window.medicalDashboard = dashboard;
    
    console.log('Medical Dashboard initialized successfully');
});