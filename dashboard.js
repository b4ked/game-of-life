// Enhanced Medical Dashboard JavaScript for Hospital Department Management
class MedicalDashboard {
    constructor() {
        this.patients = [];
        this.reports = [];
        this.alerts = [];
        this.charts = {};
        this.aiInsights = [];
        this.departmentStats = {};
        
        this.loadPatientData();
        this.initializeData();
        this.initializeEventListeners();
        this.initializeCharts();
        this.generateAIInsights();
        this.renderReports();
        this.renderAlerts();
        this.updateDepartmentStats();
    }

    // Load patient data from text file
    async loadPatientData() {
        try {
            const response = await fetch('patients_data.txt');
            const data = await response.text();
            this.parsePatientData(data);
        } catch (error) {
            console.log('Using sample data - patient file not found');
            this.loadSamplePatients();
        }
    }

    // Parse patient data from text file
    parsePatientData(data) {
        const lines = data.trim().split('\n');
        const headers = lines[0].split('|');
        
        this.patients = lines.slice(1).map(line => {
            const values = line.split('|');
            const patient = {};
            headers.forEach((header, index) => {
                patient[header.toLowerCase()] = values[index] || '';
            });
            return patient;
        });
        
        console.log(`Loaded ${this.patients.length} patients from data file`);
    }

    // Load sample patients if file not available
    loadSamplePatients() {
        this.patients = [
            {
                patient_id: 'P001',
                name: 'Sarah Johnson',
                age: '45',
                gender: 'Female',
                admission_date: '2024-01-15',
                diagnosis: 'Type 2 Diabetes',
                severity: 'High',
                vitals: 'BP:142/88,HR:78,Temp:98.6,O2:98%',
                medications: 'Metformin 500mg,Lisinopril 10mg',
                allergies: 'Penicillin',
                notes: 'Elevated HbA1c 8.2%, requires dietary counseling',
                last_visit: '2024-01-15',
                doctor_assigned: 'Dr. Smith',
                department: 'Endocrinology',
                insurance: 'BlueCross',
                emergency_contact: 'John Johnson (555-0101)'
            },
            {
                patient_id: 'P002',
                name: 'Michael Chen',
                age: '32',
                gender: 'Male',
                admission_date: '2024-01-14',
                diagnosis: 'Fractured Radius',
                severity: 'Medium',
                vitals: 'BP:120/80,HR:72,Temp:98.4,O2:99%',
                medications: 'Ibuprofen 600mg,Acetaminophen',
                allergies: 'None',
                notes: 'Displaced fracture, cast applied, orthopedic follow-up needed',
                last_visit: '2024-01-14',
                doctor_assigned: 'Dr. Williams',
                department: 'Orthopedics',
                insurance: 'Aetna',
                emergency_contact: 'Lisa Chen (555-0102)'
            }
        ];
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

        // Generate dynamic alerts based on patient data
        this.generateAlerts();
    }

    // Generate alerts based on patient data
    generateAlerts() {
        this.alerts = [];
        let alertId = 1;

        // Critical patients alerts
        const criticalPatients = this.patients.filter(p => p.severity?.toLowerCase() === 'critical');
        criticalPatients.forEach(patient => {
            this.alerts.push({
                id: alertId++,
                type: 'critical',
                title: 'Critical Patient Alert',
                message: `${patient.name} (${patient.patient_id}) - ${patient.diagnosis} requires immediate attention`,
                time: this.getTimeAgo(patient.admission_date),
                patientId: patient.patient_id
            });
        });

        // High severity patients
        const highSeverityPatients = this.patients.filter(p => p.severity?.toLowerCase() === 'high');
        highSeverityPatients.slice(0, 3).forEach(patient => {
            this.alerts.push({
                id: alertId++,
                type: 'warning',
                title: 'High Priority Patient',
                message: `${patient.name} - ${patient.diagnosis} needs monitoring`,
                time: this.getTimeAgo(patient.admission_date),
                patientId: patient.patient_id
            });
        });

        // Medication alerts for patients with allergies
        const patientsWithAllergies = this.patients.filter(p => p.allergies && p.allergies !== 'None');
        patientsWithAllergies.slice(0, 2).forEach(patient => {
            this.alerts.push({
                id: alertId++,
                type: 'warning',
                title: 'Allergy Alert',
                message: `${patient.name} - Allergic to ${patient.allergies}. Check medications.`,
                time: '30 minutes ago',
                patientId: patient.patient_id
            });
        });

        // Department capacity alerts
        const departmentCounts = this.getDepartmentPatientCounts();
        Object.entries(departmentCounts).forEach(([dept, count]) => {
            if (count > 3) {
                this.alerts.push({
                    id: alertId++,
                    type: 'info',
                    title: 'Department Capacity',
                    message: `${dept} department has ${count} active patients`,
                    time: '1 hour ago'
                });
            }
        });
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

    // Handle search across patients and reports
    handleSearch(query) {
        if (!query.trim()) {
            this.renderReports();
            return;
        }

        const searchTerm = query.toLowerCase();
        
        // Search in patients data
        const filteredPatients = this.patients.filter(patient => 
            patient.name?.toLowerCase().includes(searchTerm) ||
            patient.patient_id?.toLowerCase().includes(searchTerm) ||
            patient.diagnosis?.toLowerCase().includes(searchTerm) ||
            patient.department?.toLowerCase().includes(searchTerm) ||
            patient.doctor_assigned?.toLowerCase().includes(searchTerm)
        );

        // Convert patients to report format for display
        const patientReports = filteredPatients.map(patient => ({
            id: patient.patient_id,
            patientName: patient.name,
            patientId: patient.patient_id,
            reportType: 'patient-record',
            diagnosis: patient.diagnosis,
            reportText: `${patient.notes} | Vitals: ${patient.vitals} | Medications: ${patient.medications}`,
            severity: patient.severity?.toLowerCase() || 'medium',
            date: patient.admission_date,
            doctor: patient.doctor_assigned
        }));

        // Also search in existing reports
        const filteredReports = this.reports.filter(report => 
            report.patientName?.toLowerCase().includes(searchTerm) ||
            report.patientId?.toLowerCase().includes(searchTerm) ||
            report.diagnosis?.toLowerCase().includes(searchTerm) ||
            report.reportText?.toLowerCase().includes(searchTerm)
        );

        // Combine and render results
        const allResults = [...patientReports, ...filteredReports];
        this.renderFilteredReports(allResults);
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
        // Update statistics based on patient data
        const totalPatients = this.patients.length;
        const totalReports = this.reports.length + this.patients.length; // Include patient records
        const criticalCases = this.patients.filter(p => p.severity?.toLowerCase() === 'critical').length;
        const resolvedCases = Math.floor(totalPatients * 0.65); // Simulate resolved cases

        // Update DOM elements
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length >= 4) {
            statNumbers[0].textContent = totalPatients.toLocaleString();
            statNumbers[1].textContent = totalReports.toLocaleString();
            statNumbers[2].textContent = criticalCases.toString();
            statNumbers[3].textContent = resolvedCases.toString();
        }
        
        // Update department statistics
        this.updateDepartmentStats();
    }
    
    // Update department-wide statistics
    updateDepartmentStats() {
        this.departmentStats = {
            totalPatients: this.patients.length,
            departmentCounts: this.getDepartmentPatientCounts(),
            averageAge: this.getAverageAge(),
            criticalPatients: this.patients.filter(p => p.severity?.toLowerCase() === 'critical').length,
            highRiskPatients: this.patients.filter(p => ['critical', 'high'].includes(p.severity?.toLowerCase())).length
        };
    }
    
    // Helper functions
    getDepartmentPatientCounts() {
        const counts = {};
        this.patients.forEach(patient => {
            const dept = patient.department || 'General';
            counts[dept] = (counts[dept] || 0) + 1;
        });
        return counts;
    }
    
    getAverageAge() {
        const totalAge = this.patients.reduce((sum, patient) => {
            return sum + (parseInt(patient.age) || 0);
        }, 0);
        return totalAge > 0 ? Math.round(totalAge / this.patients.length) : 0;
    }
    
    getAverageStayByDepartment() {
        const deptStays = {};
        const deptCounts = {};
        
        this.patients.forEach(patient => {
            const dept = patient.department || 'General';
            const admissionDate = new Date(patient.admission_date);
            const today = new Date();
            const stayDays = Math.ceil((today - admissionDate) / (1000 * 60 * 60 * 24));
            
            deptStays[dept] = (deptStays[dept] || 0) + stayDays;
            deptCounts[dept] = (deptCounts[dept] || 0) + 1;
        });
        
        const avgStays = {};
        Object.keys(deptStays).forEach(dept => {
            avgStays[dept] = Math.round(deptStays[dept] / deptCounts[dept]);
        });
        
        return avgStays;
    }
    
    getTimeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
        return `${Math.ceil(diffDays / 30)} months ago`;
    }

    // Generate AI-powered insights
    generateAIInsights() {
        this.aiInsights = [
            this.generateRiskAssessment(),
            this.generateResourceAllocation(),
            this.generateTreatmentRecommendations(),
            this.generateDepartmentEfficiency(),
            this.generatePatientFlowInsights()
        ];
    }

    // Risk assessment insights
    generateRiskAssessment() {
        const criticalCount = this.patients.filter(p => p.severity?.toLowerCase() === 'critical').length;
        const highCount = this.patients.filter(p => p.severity?.toLowerCase() === 'high').length;
        const totalPatients = this.patients.length;
        
        const riskPercentage = ((criticalCount + highCount) / totalPatients * 100).toFixed(1);
        
        return {
            type: 'risk-assessment',
            title: 'Patient Risk Assessment',
            insight: `${riskPercentage}% of patients are high-risk (${criticalCount} critical, ${highCount} high severity)`,
            recommendation: criticalCount > 2 ? 
                'Consider increasing ICU capacity and scheduling additional critical care staff.' :
                'Current critical care capacity appears adequate. Monitor trends.',
            priority: criticalCount > 2 ? 'high' : 'medium',
            data: { criticalCount, highCount, totalPatients, riskPercentage }
        };
    }

    // Resource allocation insights
    generateResourceAllocation() {
        const departmentCounts = this.getDepartmentPatientCounts();
        const overloadedDepts = Object.entries(departmentCounts)
            .filter(([dept, count]) => count > 4)
            .map(([dept, count]) => `${dept} (${count} patients)`);
        
        return {
            type: 'resource-allocation',
            title: 'Department Resource Analysis',
            insight: overloadedDepts.length > 0 ? 
                `High patient load detected in: ${overloadedDepts.join(', ')}` :
                'Patient load is well-distributed across departments',
            recommendation: overloadedDepts.length > 0 ? 
                'Consider redistributing staff or scheduling additional shifts for overloaded departments.' :
                'Current resource allocation appears optimal.',
            priority: overloadedDepts.length > 0 ? 'high' : 'low',
            data: departmentCounts
        };
    }

    // Treatment recommendations
    generateTreatmentRecommendations() {
        const commonDiagnoses = this.getCommonDiagnoses();
        const topDiagnosis = commonDiagnoses[0];
        
        const recommendations = {
            'Type 2 Diabetes': 'Consider implementing group diabetes education sessions and continuous glucose monitoring programs.',
            'Hypertension': 'Recommend 24-hour blood pressure monitoring and lifestyle modification programs.',
            'COPD': 'Implement pulmonary rehabilitation programs and smoking cessation support.',
            'Pneumonia': 'Consider pneumonia prevention protocols and vaccination programs.'
        };
        
        return {
            type: 'treatment-recommendations',
            title: 'Treatment Protocol Optimization',
            insight: `Most common diagnosis: ${topDiagnosis?.diagnosis} (${topDiagnosis?.count} cases)`,
            recommendation: recommendations[topDiagnosis?.diagnosis] || 
                'Review treatment protocols for most common diagnoses to improve patient outcomes.',
            priority: 'medium',
            data: commonDiagnoses
        };
    }

    // Department efficiency insights
    generateDepartmentEfficiency() {
        const avgStayByDept = this.getAverageStayByDepartment();
        const longestStay = Object.entries(avgStayByDept)
            .sort(([,a], [,b]) => b - a)[0];
        
        return {
            type: 'department-efficiency',
            title: 'Department Efficiency Analysis',
            insight: longestStay ? 
                `${longestStay[0]} has the longest average patient stay (${longestStay[1]} days)` :
                'Department efficiency data being analyzed',
            recommendation: longestStay && longestStay[1] > 5 ? 
                'Review discharge planning and care coordination processes to reduce length of stay.' :
                'Department efficiency appears within normal parameters.',
            priority: longestStay && longestStay[1] > 7 ? 'high' : 'low',
            data: avgStayByDept
        };
    }

    // Patient flow insights
    generatePatientFlowInsights() {
        const recentAdmissions = this.patients.filter(p => {
            const admissionDate = new Date(p.admission_date);
            const threeDaysAgo = new Date();
            threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
            return admissionDate >= threeDaysAgo;
        }).length;
        
        return {
            type: 'patient-flow',
            title: 'Patient Flow Analysis',
            insight: `${recentAdmissions} new admissions in the last 3 days`,
            recommendation: recentAdmissions > 10 ? 
                'High admission rate detected. Consider bed management optimization and discharge planning acceleration.' :
                'Patient flow is manageable. Continue monitoring admission trends.',
            priority: recentAdmissions > 15 ? 'high' : 'medium',
            data: { recentAdmissions, totalPatients: this.patients.length }
        };
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
        
        // Count diagnoses from patients
        this.patients.forEach(patient => {
            if (patient.diagnosis) {
                diagnoses[patient.diagnosis] = (diagnoses[patient.diagnosis] || 0) + 1;
            }
        });
        
        // Also count from reports
        this.reports.forEach(report => {
            if (report.diagnosis) {
                diagnoses[report.diagnosis] = (diagnoses[report.diagnosis] || 0) + 1;
            }
        });

        return Object.entries(diagnoses)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 6)
            .map(([diagnosis, count]) => ({ diagnosis, count }));
    }

    getSeverityDistribution() {
        const distribution = { low: 0, medium: 0, high: 0, critical: 0 };
        
        // Count from patients
        this.patients.forEach(patient => {
            const severity = patient.severity?.toLowerCase() || 'medium';
            if (distribution.hasOwnProperty(severity)) {
                distribution[severity]++;
            }
        });
        
        // Also count from reports
        this.reports.forEach(report => {
            if (report.severity && distribution.hasOwnProperty(report.severity)) {
                distribution[report.severity]++;
            }
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
        const ageGroups = {
            '0-18': 0,
            '19-35': 0,
            '36-50': 0,
            '51-65': 0,
            '65+': 0
        };
        
        const gender = {
            male: 0,
            female: 0,
            other: 0
        };
        
        this.patients.forEach(patient => {
            // Age grouping
            const age = parseInt(patient.age);
            if (age <= 18) ageGroups['0-18']++;
            else if (age <= 35) ageGroups['19-35']++;
            else if (age <= 50) ageGroups['36-50']++;
            else if (age <= 65) ageGroups['51-65']++;
            else ageGroups['65+']++;
            
            // Gender distribution
            const genderLower = patient.gender?.toLowerCase();
            if (genderLower === 'male') gender.male++;
            else if (genderLower === 'female') gender.female++;
            else gender.other++;
        });
        
        return { ageGroups, gender };
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    const dashboard = new MedicalDashboard();
    
    // Make dashboard globally accessible for debugging
    window.medicalDashboard = dashboard;
    
    console.log('Enhanced Medical Dashboard initialized successfully');
    console.log(`Managing ${dashboard.patients.length} patients across multiple departments`);
});