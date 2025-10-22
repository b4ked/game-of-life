// Medical Dashboard Application
class MedicalDashboard {
    constructor() {
        this.currentView = 'overview';
        this.reports = [];
        this.patients = [];
        this.filters = {
            reportType: 'all',
            urgency: 'all',
            dateRange: '7',
            searchTerm: ''
        };
        
        this.init();
    }

    init() {
        this.generateSampleData();
        this.setupEventListeners();
        this.renderOverview();
    }

    generateSampleData() {
        // Generate sample patients
        const firstNames = ['John', 'Emma', 'Michael', 'Sarah', 'David', 'Lisa', 'James', 'Mary', 'Robert', 'Jennifer', 'William', 'Linda', 'Richard', 'Patricia', 'Thomas'];
        const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson'];
        
        for (let i = 0; i < 15; i++) {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            this.patients.push({
                id: `PT${String(i + 1000).padStart(5, '0')}`,
                name: `${firstName} ${lastName}`,
                age: 25 + Math.floor(Math.random() * 50),
                gender: Math.random() > 0.5 ? 'Male' : 'Female',
                lastVisit: this.randomDate(90)
            });
        }

        // Generate sample medical reports
        const reportTemplates = [
            {
                type: 'lab',
                title: 'Complete Blood Count (CBC)',
                urgency: 'normal',
                findings: 'White Blood Cell Count: 7.2 K/uL (Normal: 4.5-11.0)\nRed Blood Cell Count: 4.8 M/uL (Normal: 4.5-5.5)\nHemoglobin: 14.5 g/dL (Normal: 13.5-17.5)\nHematocrit: 43% (Normal: 38.3-48.6)\nPlatelet Count: 250 K/uL (Normal: 150-400)\n\nInterpretation: All values within normal limits. No evidence of anemia or infection. Patient appears to be in good health based on hematological parameters.',
                recommendations: 'Continue routine monitoring. Schedule follow-up CBC in 6 months as part of annual physical examination.'
            },
            {
                type: 'imaging',
                title: 'Chest X-Ray',
                urgency: 'normal',
                findings: 'PA and lateral views of the chest were obtained.\n\nLungs: Clear bilaterally with no focal consolidation, pleural effusion, or pneumothorax.\nHeart: Normal size and contour. Cardiothoracic ratio within normal limits.\nMediastinum: No widening or mass lesions.\nBony structures: No acute fractures or lytic lesions visible.\n\nImpression: Normal chest radiograph. No acute cardiopulmonary disease.',
                recommendations: 'No immediate follow-up required. Routine screening as clinically indicated.'
            },
            {
                type: 'pathology',
                title: 'Skin Biopsy - Left Forearm',
                urgency: 'high',
                findings: 'Specimen: 4mm punch biopsy from left forearm\n\nMicroscopic Description:\nThe epidermis shows irregular acanthosis with elongation of rete ridges. There is focal parakeratosis. The dermis contains a dense lymphocytic infiltrate with occasional eosinophils. Blood vessels show mild dilatation.\n\nDiagnosis: Chronic dermatitis with features suggestive of allergic contact dermatitis.\n\nComment: Clinical correlation recommended. Consider patch testing to identify potential allergens.',
                recommendations: 'Recommend dermatology follow-up for patch testing. Consider topical corticosteroid therapy. Avoid suspected allergens.'
            },
            {
                type: 'cardiology',
                title: 'Echocardiogram Report',
                urgency: 'critical',
                findings: 'Transthoracic Echocardiogram performed:\n\nLeft Ventricle: Mildly dilated with moderate global hypokinesis. Estimated ejection fraction 35-40%.\nRight Ventricle: Normal size and function.\nLeft Atrium: Mildly enlarged (4.2 cm).\nAortic Valve: Trileaflet with mild sclerosis, no significant stenosis or regurgitation.\nMitral Valve: Moderate regurgitation present.\nPericardium: No effusion.\n\nConclusion: Reduced left ventricular systolic function consistent with dilated cardiomyopathy. Moderate mitral regurgitation.',
                recommendations: 'URGENT: Cardiology consultation recommended within 48 hours. Consider initiation of heart failure therapy. Repeat echocardiogram in 3 months to assess response to treatment.'
            },
            {
                type: 'lab',
                title: 'Comprehensive Metabolic Panel',
                urgency: 'normal',
                findings: 'Glucose: 95 mg/dL (Normal: 70-100)\nSodium: 140 mEq/L (Normal: 136-145)\nPotassium: 4.2 mEq/L (Normal: 3.5-5.0)\nChloride: 102 mEq/L (Normal: 98-107)\nCO2: 25 mEq/L (Normal: 23-29)\nBUN: 15 mg/dL (Normal: 7-20)\nCreatinine: 0.9 mg/dL (Normal: 0.6-1.2)\nCalcium: 9.5 mg/dL (Normal: 8.5-10.5)\nTotal Protein: 7.2 g/dL (Normal: 6.0-8.3)\nAlbumin: 4.1 g/dL (Normal: 3.5-5.5)\nTotal Bilirubin: 0.8 mg/dL (Normal: 0.1-1.2)\nAlkaline Phosphatase: 75 U/L (Normal: 44-147)\nAST: 28 U/L (Normal: 8-48)\nALT: 32 U/L (Normal: 7-55)\n\nInterpretation: All electrolytes, kidney function, and liver function tests within normal limits.',
                recommendations: 'No immediate action required. Continue current health maintenance plan.'
            },
            {
                type: 'imaging',
                title: 'MRI Brain with Contrast',
                urgency: 'high',
                findings: 'Brain MRI with and without gadolinium contrast:\n\nTechnique: Multiplanar T1, T2, FLAIR, and diffusion-weighted sequences obtained.\n\nFindings:\nBrain parenchyma: Multiple T2/FLAIR hyperintense foci in the periventricular and subcortical white matter, largest measuring 8mm. These demonstrate no enhancement post-contrast.\nVentricles: Normal size and configuration.\nExtra-axial spaces: No extra-axial fluid collections.\nOrbits: Normal.\nParanasal sinuses: Clear.\n\nImpression: Multiple non-enhancing white matter lesions. Differential diagnosis includes demyelinating disease (e.g., multiple sclerosis), chronic microvascular ischemic changes, or migraine-related changes. Clinical correlation and possible neurology consultation recommended.',
                recommendations: 'Neurology referral recommended for further evaluation. Consider lumbar puncture if demyelinating disease suspected. Follow-up MRI in 3-6 months.'
            },
            {
                type: 'lab',
                title: 'Lipid Panel',
                urgency: 'high',
                findings: 'Fasting Lipid Profile (12-hour fast confirmed):\n\nTotal Cholesterol: 285 mg/dL (Desirable: <200)\nLDL Cholesterol: 190 mg/dL (Optimal: <100)\nHDL Cholesterol: 38 mg/dL (Desirable: >40)\nTriglycerides: 285 mg/dL (Normal: <150)\nNon-HDL Cholesterol: 247 mg/dL (Optimal: <130)\nCholesterol/HDL Ratio: 7.5 (Optimal: <5.0)\n\nInterpretation: Significantly elevated total cholesterol and LDL cholesterol. Low HDL cholesterol. Elevated triglycerides. High cardiovascular risk profile.',
                recommendations: 'Initiate lipid-lowering therapy with statin. Recommend lifestyle modifications including diet and exercise. Recheck lipid panel in 6-8 weeks. Consider referral to nutritionist.'
            },
            {
                type: 'pathology',
                title: 'Thyroid Nodule FNA Biopsy',
                urgency: 'normal',
                findings: 'Fine Needle Aspiration - Right Thyroid Nodule\n\nClinical History: 2.5 cm nodule right thyroid lobe\n\nCytology: Abundant colloid with benign-appearing follicular cells arranged in flat sheets and small clusters. No nuclear atypia, grooves, or inclusions identified.\n\nBethesda Category: II - Benign\n\nDiagnosis: Benign follicular nodule (consistent with colloid nodule/adenomatoid nodule).\n\nComment: Cytologic findings are benign. Malignancy risk <1%.',
                recommendations: 'Clinical and ultrasound follow-up in 12-24 months recommended per ATA guidelines. No immediate intervention required.'
            },
            {
                type: 'cardiology',
                title: '24-Hour Holter Monitor',
                urgency: 'normal',
                findings: '24-Hour Ambulatory ECG Monitoring:\n\nMonitoring period: 24 hours, 15 minutes\nAnalyzable data: 98%\n\nRhythm Analysis:\nUnderlying rhythm: Normal sinus rhythm\nAverage heart rate: 72 bpm (range: 48-135 bpm)\nPremature Atrial Contractions: 45 (isolated)\nPremature Ventricular Contractions: 12 (isolated, unifocal)\nNo sustained arrhythmias detected\nNo significant pauses (>2.5 seconds)\n\nST Segment Analysis: No significant ST-T wave changes\n\nSymptom Correlation: Patient reported 2 episodes of palpitations. ECG during symptoms showed isolated PACs.\n\nConclusion: Predominantly normal sinus rhythm with rare isolated ectopy. No significant arrhythmias.',
                recommendations: 'Reassurance. No antiarrhythmic therapy indicated. Follow-up if symptoms worsen or become more frequent.'
            },
            {
                type: 'imaging',
                title: 'Abdominal Ultrasound',
                urgency: 'critical',
                findings: 'Complete Abdominal Ultrasound:\n\nLiver: Mildly enlarged with increased echogenicity consistent with fatty infiltration. No focal masses. Portal vein patent with normal flow.\nGallbladder: Multiple gallstones identified, largest 15mm. Wall thickness normal. No pericholecystic fluid.\nBile Ducts: Common bile duct measures 8mm (upper limit of normal).\nPancreas: Partially visualized, appears normal.\nSpleen: Normal size and echogenicity.\nKidneys: Right kidney 11cm, left kidney 10.5cm. Simple cyst left kidney 2cm. No hydronephrosis or stones.\nAorta: Normal caliber, no aneurysm.\n\nImpression:\n1. Hepatic steatosis (fatty liver)\n2. Cholelithiasis (gallstones) - largest 15mm\n3. Simple renal cyst, left kidney',
                recommendations: 'Surgical consultation for symptomatic cholelithiasis. Lifestyle modification and weight loss for fatty liver. Metabolic panel and lipid screening recommended. Renal cyst is benign, no follow-up needed unless symptomatic.'
            }
        ];

        // Generate reports with random variations
        for (let i = 0; i < 10; i++) {
            const template = reportTemplates[i % reportTemplates.length];
            const patient = this.patients[Math.floor(Math.random() * this.patients.length)];
            
            this.reports.push({
                id: `RPT${String(i + 1).padStart(5, '0')}`,
                type: template.type,
                title: template.title,
                patient: patient,
                date: this.randomDate(parseInt(this.filters.dateRange)),
                urgency: template.urgency,
                findings: template.findings,
                recommendations: template.recommendations,
                physician: this.randomPhysician()
            });
        }
    }

    randomDate(maxDaysAgo) {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * maxDaysAgo));
        return date;
    }

    randomPhysician() {
        const physicians = [
            'Dr. Sarah Mitchell, MD',
            'Dr. James Patterson, DO',
            'Dr. Emily Chen, MD',
            'Dr. Robert Thompson, MD',
            'Dr. Maria Garcia, MD',
            'Dr. David Lee, DO'
        ];
        return physicians[Math.floor(Math.random() * physicians.length)];
    }

    formatDate(date) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const view = item.dataset.view;
                this.switchView(view);
            });
        });

        // Search
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.filters.searchTerm = e.target.value.toLowerCase();
            this.applyFilters();
        });

        // Filters
        document.getElementById('reportTypeFilter')?.addEventListener('change', (e) => {
            this.filters.reportType = e.target.value;
            this.applyFilters();
        });

        document.getElementById('urgencyFilter')?.addEventListener('change', (e) => {
            this.filters.urgency = e.target.value;
            this.applyFilters();
        });

        document.getElementById('dateFilter')?.addEventListener('change', (e) => {
            this.filters.dateRange = e.target.value;
            this.applyFilters();
        });

        // Modal
        const modal = document.getElementById('reportModal');
        const closeBtn = modal.querySelector('.modal-close');
        
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    switchView(view) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-view="${view}"]`).classList.add('active');

        // Update views
        document.querySelectorAll('.view').forEach(v => {
            v.classList.remove('active');
        });
        document.getElementById(`${view}View`).classList.add('active');

        // Update title
        const titles = {
            overview: 'Patient Overview',
            reports: 'Medical Reports',
            patients: 'Patient Records',
            analytics: 'Analytics & Insights'
        };
        document.getElementById('viewTitle').textContent = titles[view];

        this.currentView = view;

        // Render appropriate view
        switch(view) {
            case 'overview':
                this.renderOverview();
                break;
            case 'reports':
                this.renderReports();
                break;
            case 'patients':
                this.renderPatients();
                break;
            case 'analytics':
                this.renderAnalytics();
                break;
        }
    }

    renderOverview() {
        this.renderRecentReports();
        this.renderAlerts();
    }

    renderRecentReports() {
        const container = document.getElementById('recentReports');
        const recentReports = this.reports.slice(0, 5);

        container.innerHTML = recentReports.map(report => `
            <div class="report-item" onclick="dashboard.showReportDetail('${report.id}')">
                <div class="report-header">
                    <div class="report-title">${report.title}</div>
                    <span class="report-badge ${report.urgency}">${report.urgency.toUpperCase()}</span>
                </div>
                <div class="report-meta">
                    <span>📋 ${report.patient.name}</span>
                    <span>🕐 ${this.formatDate(report.date)}</span>
                    <span>👨‍⚕️ ${report.type.charAt(0).toUpperCase() + report.type.slice(1)}</span>
                </div>
                <div class="report-preview">${report.findings.substring(0, 150)}...</div>
            </div>
        `).join('');
    }

    renderAlerts() {
        const container = document.getElementById('alertsList');
        const criticalReports = this.reports.filter(r => r.urgency === 'critical' || r.urgency === 'high');

        container.innerHTML = criticalReports.slice(0, 3).map(report => `
            <div class="alert-item ${report.urgency === 'critical' ? '' : 'warning'}" onclick="dashboard.showReportDetail('${report.id}')">
                <div class="report-header">
                    <div class="report-title">${report.title}</div>
                    <span class="report-badge ${report.urgency}">${report.urgency.toUpperCase()}</span>
                </div>
                <div class="report-meta">
                    <span>📋 ${report.patient.name}</span>
                    <span>🕐 ${this.formatDate(report.date)}</span>
                </div>
                <div class="report-preview">${report.recommendations}</div>
            </div>
        `).join('');
    }

    renderReports() {
        const container = document.getElementById('allReports');
        const filteredReports = this.getFilteredReports();

        container.innerHTML = filteredReports.map(report => `
            <div class="report-item" onclick="dashboard.showReportDetail('${report.id}')">
                <div class="report-header">
                    <div class="report-title">${report.title}</div>
                    <span class="report-badge ${report.urgency}">${report.urgency.toUpperCase()}</span>
                </div>
                <div class="report-meta">
                    <span>📋 ${report.patient.name} (${report.patient.id})</span>
                    <span>🕐 ${this.formatDate(report.date)}</span>
                    <span>👨‍⚕️ ${report.type.charAt(0).toUpperCase() + report.type.slice(1)}</span>
                </div>
                <div class="report-preview">${report.findings.substring(0, 200)}...</div>
            </div>
        `).join('');

        if (filteredReports.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 3rem;">No reports match your filters.</p>';
        }
    }

    renderPatients() {
        const container = document.getElementById('patientsList');
        const searchTerm = this.filters.searchTerm;
        
        let filteredPatients = this.patients;
        if (searchTerm) {
            filteredPatients = this.patients.filter(p => 
                p.name.toLowerCase().includes(searchTerm) ||
                p.id.toLowerCase().includes(searchTerm)
            );
        }

        container.innerHTML = filteredPatients.map(patient => {
            const patientReports = this.reports.filter(r => r.patient.id === patient.id);
            const initials = patient.name.split(' ').map(n => n[0]).join('');
            
            return `
                <div class="patient-card">
                    <div class="patient-header">
                        <div class="patient-avatar">${initials}</div>
                        <div class="patient-info">
                            <h4>${patient.name}</h4>
                            <div class="patient-id">${patient.id}</div>
                        </div>
                    </div>
                    <div class="patient-details">
                        <div>👤 ${patient.gender} • ${patient.age} years old</div>
                        <div>📅 Last visit: ${this.formatDate(patient.lastVisit)}</div>
                        <div>📋 Reports: ${patientReports.length}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderAnalytics() {
        this.renderReportDistribution();
        this.renderReportVolume();
    }

    renderReportDistribution() {
        const container = document.getElementById('reportDistribution');
        const distribution = {};
        
        this.reports.forEach(report => {
            distribution[report.type] = (distribution[report.type] || 0) + 1;
        });

        const total = this.reports.length;
        const types = Object.keys(distribution);
        const colors = {
            lab: '#3B82F6',
            imaging: '#8B5CF6',
            pathology: '#10B981',
            cardiology: '#F59E0B'
        };

        container.innerHTML = `
            <div style="display: flex; gap: 2rem; align-items: center; justify-content: center; height: 100%;">
                <div style="display: flex; gap: 1rem;">
                    ${types.map(type => {
                        const count = distribution[type];
                        const percentage = ((count / total) * 100).toFixed(1);
                        const height = (count / Math.max(...Object.values(distribution))) * 200;
                        
                        return `
                            <div class="chart-bar">
                                <div class="bar" style="height: ${height}px; background: linear-gradient(to top, ${colors[type]}, ${colors[type]}99);">
                                    <div class="bar-value">${count}</div>
                                </div>
                                <div class="bar-label">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
                                <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.25rem;">${percentage}%</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    renderReportVolume() {
        const container = document.getElementById('reportVolume');
        
        // Generate volume data for last 30 days
        const volumeData = [];
        for (let i = 29; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dayReports = this.reports.filter(r => {
                return r.date.toDateString() === date.toDateString();
            });
            volumeData.push({
                date: date,
                count: dayReports.length || Math.floor(Math.random() * 5)
            });
        }

        const maxCount = Math.max(...volumeData.map(d => d.count), 5);
        
        container.innerHTML = `
            <div style="display: flex; gap: 0.25rem; align-items: flex-end; justify-content: center; height: 100%; padding: 1rem;">
                ${volumeData.map(data => {
                    const height = (data.count / maxCount) * 180;
                    return `
                        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
                            <div style="width: 100%; background: linear-gradient(to top, var(--primary-blue), #60A5FA); border-radius: var(--radius-sm) var(--radius-sm) 0 0; position: relative; height: ${height}px; min-height: 2px;" title="${this.formatDate(data.date)}: ${data.count} reports">
                                ${data.count > 0 ? `<div style="position: absolute; top: -1.25rem; left: 50%; transform: translateX(-50%); font-size: 0.625rem; font-weight: 600; color: var(--text-primary);">${data.count}</div>` : ''}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            <div style="text-align: center; margin-top: 1rem; color: var(--text-secondary); font-size: 0.875rem;">
                Daily report volume over the last 30 days
            </div>
        `;
    }

    getFilteredReports() {
        let filtered = [...this.reports];

        // Filter by type
        if (this.filters.reportType !== 'all') {
            filtered = filtered.filter(r => r.type === this.filters.reportType);
        }

        // Filter by urgency
        if (this.filters.urgency !== 'all') {
            filtered = filtered.filter(r => r.urgency === this.filters.urgency);
        }

        // Filter by date range
        if (this.filters.dateRange !== 'all') {
            const days = parseInt(this.filters.dateRange);
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - days);
            filtered = filtered.filter(r => r.date >= cutoffDate);
        }

        // Filter by search term
        if (this.filters.searchTerm) {
            filtered = filtered.filter(r => 
                r.title.toLowerCase().includes(this.filters.searchTerm) ||
                r.patient.name.toLowerCase().includes(this.filters.searchTerm) ||
                r.patient.id.toLowerCase().includes(this.filters.searchTerm) ||
                r.findings.toLowerCase().includes(this.filters.searchTerm)
            );
        }

        return filtered;
    }

    applyFilters() {
        if (this.currentView === 'reports') {
            this.renderReports();
        } else if (this.currentView === 'patients') {
            this.renderPatients();
        } else if (this.currentView === 'overview') {
            this.renderOverview();
        }
    }

    showReportDetail(reportId) {
        const report = this.reports.find(r => r.id === reportId);
        if (!report) return;

        const modal = document.getElementById('reportModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        modalTitle.textContent = report.title;
        modalBody.innerHTML = `
            <div class="detail-section">
                <div class="detail-grid">
                    <div class="detail-item">
                        <div class="detail-label">Report ID</div>
                        <div class="detail-value">${report.id}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Date</div>
                        <div class="detail-value">${this.formatDate(report.date)}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Type</div>
                        <div class="detail-value">${report.type.charAt(0).toUpperCase() + report.type.slice(1)}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Urgency</div>
                        <div class="detail-value">
                            <span class="report-badge ${report.urgency}">${report.urgency.toUpperCase()}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="detail-section">
                <div class="detail-grid">
                    <div class="detail-item">
                        <div class="detail-label">Patient Name</div>
                        <div class="detail-value">${report.patient.name}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Patient ID</div>
                        <div class="detail-value">${report.patient.id}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Age</div>
                        <div class="detail-value">${report.patient.age} years</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Gender</div>
                        <div class="detail-value">${report.patient.gender}</div>
                    </div>
                </div>
            </div>

            <div class="detail-section">
                <h3>Clinical Findings</h3>
                <div class="report-text">${report.findings}</div>
            </div>

            <div class="detail-section">
                <h3>Recommendations</h3>
                <div class="report-text">${report.recommendations}</div>
            </div>

            <div class="detail-section">
                <div class="detail-item">
                    <div class="detail-label">Reporting Physician</div>
                    <div class="detail-value">${report.physician}</div>
                </div>
            </div>
        `;

        modal.classList.add('active');
    }
}

// Initialize dashboard when page loads
let dashboard;
window.addEventListener('load', () => {
    dashboard = new MedicalDashboard();
});
