import { Path } from '@/types/content';
import { COURSE_CERTIFICATION_POLICIES } from '../certification-policies';

export const cloudDevopsPath: Path = {
  id: 'cloud-devops-mastery',
  slug: 'cloud-devops',
  title: 'Cloud Computing & DevOps Engineering',
  subtitle: 'Master AWS cloud architecture, Docker containerization, Kubernetes orchestration, Terraform IaC, and CI/CD pipelines.',
  description: 'Master cloud infrastructure: AWS core services (EC2, S3, RDS, VPC), Docker containerization, Docker Compose, Kubernetes cluster management (Pods, Deployments, Services), Infrastructure as Code with Terraform, CI/CD automation, and Prometheus/Grafana monitoring.',
  icon: '☁️',
  category: 'cs',
  categoryLabel: 'Infrastructure & Cloud',
  isActive: true,
  status: 'active',
  courseType: 'hybrid',
  difficulty: 'advanced',
  estimatedHours: 60,
  totalLessons: 6,
  totalProjects: 2,
  certificationRequirement: COURSE_CERTIFICATION_POLICIES['cloud-devops'],
  projects: [
    {
      id: 'cloud-proj-1',
      slug: 'dockerized-microservice-stack',
      title: 'Multi-Container Docker Compose Application Stack',
      subtitle: 'Build a containerized application stack with Node.js backend, PostgreSQL database, Redis cache, and Nginx reverse proxy.',
      description: 'Architect a multi-container Docker Compose application defining optimized Dockerfiles, network isolation bridges, volume persistence, and health check dependencies.',
      difficulty: 'intermediate',
      estimatedHours: 6,
      skillsLearned: ['Multi-Stage Dockerfiles', 'Docker Compose Orchestration', 'Named Volumes & Networks', 'Reverse Proxy Nginx'],
      prerequisites: ['Docker Containers & Compose'],
      learningObjectives: ['Construct lightweight multi-stage Alpine Docker images.', 'Configure inter-container networking bridges with Docker Compose.'],
      starterCode: `version: '3.8'\nservices:\n  backend:\n    build: .\n    ports:\n      - "3000:3000"`,
      projectInstructionsMarkdown: '### Project Overview\nArchitect a containerized multi-service web application stack using Docker Compose.',
      milestones: [
        { id: 'cloudm1', title: 'Milestone 1: Multi-Stage Dockerfile Optimization', description: 'Write multi-stage Dockerfile paring image footprint to under 100MB.', orderIndex: 1 },
        { id: 'cloudm2', title: 'Milestone 2: Docker Compose Stack Configuration', description: 'Configure services, volume persistence, and inter-container network dependencies.', orderIndex: 2 }
      ],
      completionCriteria: 'Verify multi-container startup, network isolation, and data volume persistence.',
      pathSlug: 'cloud-devops'
    },
    {
      id: 'cloud-proj-2',
      slug: 'kubernetes-cloud-deployment-pipeline',
      title: 'Kubernetes Production Cluster Infrastructure',
      subtitle: 'Deploy a resilient cloud application on Kubernetes using Declarative Manifests, Helm Charts, and Ingress Controller.',
      description: 'Engineer production Kubernetes infrastructure incorporating Deployments, Horizontal Pod Autoscalers (HPA), ConfigMaps, Secrets, Services, Ingress routes, and Terraform IaC provisioning.',
      difficulty: 'advanced',
      estimatedHours: 8,
      skillsLearned: ['Kubernetes Manifests (YAML)', 'Horizontal Pod Autoscaler (HPA)', 'Terraform Cloud Provisioning', 'Ingress Routing'],
      prerequisites: ['Kubernetes Core & Terraform'],
      learningObjectives: ['Deploy auto-scaling pod replicas across Kubernetes worker nodes.', 'Provision cloud resources declaratively using Terraform.'],
      starterCode: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web-app\nspec:\n  replicas: 3`,
      projectInstructionsMarkdown: '### Project Overview\nEngineer production-grade Kubernetes cluster manifests and Terraform cloud infrastructure.',
      milestones: [
        { id: 'cloudm3', title: 'Milestone 1: Kubernetes Deployment & Service Manifests', description: 'Create Deployment, ClusterIP Service, and Ingress routing YAML files.', orderIndex: 1 },
        { id: 'cloudm4', title: 'Milestone 2: Terraform AWS Infrastructure Provisioning', description: 'Write Terraform modules provisioning VPC, subnets, and Kubernetes cluster.', orderIndex: 2 }
      ],
      completionCriteria: 'Pass Kubernetes manifest validation, HPA auto-scaling rules, and Terraform execution plans.',
      pathSlug: 'cloud-devops'
    }
  ],
  modules: [
    {
      id: 'cloud-mod-1',
      slug: 'cloud-foundations',
      title: 'Level 1: Cloud Architecture & Docker Containerization',
      description: 'Master Cloud Service Models (IaaS, PaaS, SaaS), AWS EC2 / S3 / VPC, Docker image layers, and multi-stage Dockerfiles.',
      level: 'foundations',
      orderIndex: 1,
      lessons: [
        {
          id: 'cloud-les-1',
          slug: 'cloud-aws-azure-fundamentals',
          title: 'Cloud Service Models & AWS Core Infrastructure',
          description: 'Learn IaaS vs PaaS vs SaaS, AWS EC2 compute instances, S3 object storage buckets, RDS databases, and Virtual Private Cloud (VPC) networking.',
          estimatedMinutes: 30,
          orderIndex: 1,
          prerequisites: [],
          concepts: [
            {
              id: 'cloudc1_1',
              title: 'Learning Objectives & Cloud Architecture',
              contentMarkdown: `### Learning Objectives
- Compare Cloud Service Models: IaaS (AWS EC2), PaaS (AWS Elastic Beanstalk), and SaaS (Google Workspace).
- Configure AWS Virtual Private Cloud (VPC) public and private subnets.
- Store static assets securely using AWS S3 bucket access policies.
- Understand cloud elasticity and auto-scaling group metrics.

---

### Cloud Computing Paradigms
Cloud computing replaces physical on-premise datacenter hardware with elastic, pay-as-you-go infrastructure resources provisioned via web APIs.`
            }
          ],
          examples: [
            {
              id: 'cloudex1_1',
              title: 'Example 1: AWS VPC Subnet Architecture',
              code: `// AWS VPC Network Topology Concept
- VPC (10.0.0.0/16)
  ├── Public Subnet (10.0.1.0/24) -> Internet Gateway (IGW) -> ALBs
  └── Private Subnet (10.0.2.0/24) -> NAT Gateway -> EC2 App Instances & RDS`,
              explanation: 'Public subnets route inbound web traffic while private subnets isolate backend app servers and database instances.'
            }
          ],
          quiz: [
            {
              id: 'cloudq1_1',
              question: 'Which cloud service model provides virtualized raw compute servers and network infrastructure (e.g. AWS EC2)?',
              options: ['IaaS (Infrastructure as a Service)', 'PaaS', 'SaaS', 'FaaS'],
              correctOptionIndex: 0,
              explanation: 'Infrastructure as a Service (IaaS) provides virtualized compute, storage, and networking building blocks.'
            }
          ],
          exercise: {
            id: 'cloudex-1',
            instructions: 'Write a snippet outputting `"AWS VPC Architecture Configured"` to standard console.log.',
            initialCode: '// VPC status snippet\n',
            solutionCode: 'console.log("AWS VPC Architecture Configured");',
            hints: ['console.log("AWS VPC Architecture Configured");'],
            validationType: 'stdout',
            testCases: [{ id: 'cloudtc1', description: 'Outputs AWS VPC status', expectedOutput: 'AWS VPC Architecture Configured' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'cloud-les-2',
          slug: 'cloud-docker-containers-multistage',
          title: 'Docker Image Layering & Multi-Stage Dockerfiles',
          description: 'Build isolated container images, understand copy-on-write image layers, Docker caching, and write lightweight multi-stage Alpine Dockerfiles.',
          estimatedMinutes: 35,
          orderIndex: 2,
          prerequisites: ['cloud-les-1'],
          concepts: [
            {
              id: 'cloudc2_1',
              title: 'Docker Architecture & Multi-Stage Builds',
              contentMarkdown: `### Why Multi-Stage Docker Builds?
Standard single-stage Dockerfiles include build tools (compilers, devDependencies, SDKs) in the final output image, producing bloated 1GB+ images. **Multi-Stage Builds** separate compilation environments from final minimal runtime images (e.g. Alpine Linux).`
            }
          ],
          examples: [
            {
              id: 'cloudex2_1',
              title: 'Example 1: Multi-Stage Node.js Dockerfile',
              code: `# Stage 1: Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production runtime stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]`,
              explanation: 'Stage 2 copies strictly production assets from Stage 1, eliminating build dependencies and minimizing container attack surface.'
            }
          ],
          quiz: [
            {
              id: 'cloudq2_1',
              question: 'What is the primary benefit of multi-stage Dockerfile builds in production container deployment?',
              options: [
                ' Drastically reduces final production container image sizes and security attack surface',
                'Speeds up internet connection speeds',
                'Eliminates the need for Docker Compose',
                'Bypasses Linux permissions'
              ],
              correctOptionIndex: 0,
              explanation: 'Multi-stage builds discard build-time compilers and dev dependencies, paring image sizes down significantly.'
            }
          ],
          exercise: {
            id: 'cloudex-2',
            instructions: 'Write multi-stage Dockerfile directive `FROM node:20-alpine AS builder` and match text.',
            initialCode: '# Multi-stage directive\n',
            solutionCode: 'FROM node:20-alpine AS builder',
            hints: ['Use FROM node:20-alpine AS builder'],
            validationType: 'text_match',
            testCases: [{ id: 'cloudtc2', description: 'Matches multi-stage directive', expectedOutput: 'FROM node:20-alpine AS builder' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'cloud-mod-2',
      slug: 'cloud-kubernetes-orchestration',
      title: 'Level 2: Kubernetes Container Orchestration & Docker Compose',
      description: 'Orchestrate multi-container applications with Docker Compose, and master Kubernetes Objects (Pods, Deployments, Services, Ingress, HPA).',
      level: 'intermediate',
      orderIndex: 2,
      lessons: [
        {
          id: 'cloud-les-3',
          slug: 'cloud-docker-compose-stack',
          title: 'Multi-Container Stacks with Docker Compose',
          description: 'Define multi-service applications using docker-compose.yml, configure container bridges, volumes, environment variables, and health checks.',
          estimatedMinutes: 35,
          orderIndex: 1,
          prerequisites: ['cloud-les-2'],
          concepts: [
            {
              id: 'cloudc3_1',
              title: 'Docker Compose Architecture',
              contentMarkdown: `### Docker Compose Networks & Volumes
Docker Compose manages multi-container application lifecycles.
- **Networks**: Automatically creates isolated DNS bridge networks allowing containers to communicate using service names (\`http://backend:3000\`).
- **Volumes**: Mounts persistent host storage so database records survive container restarts.`
            }
          ],
          examples: [
            {
              id: 'cloudex3_1',
              title: 'Example 1: docker-compose.yml Definition',
              code: `version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/main
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_PASSWORD=pass
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:`,
              explanation: 'web service communicates directly with db service using hostname db over Docker internal network.'
            }
          ],
          quiz: [
            {
              id: 'cloudq3_1',
              question: 'How do containers within the same Docker Compose file resolve IP addresses for inter-service communication?',
              options: [
                'Using service names as DNS hostnames over Docker internal bridge networks',
                'By binding to 127.0.0.1 directly',
                'Through public IP addresses',
                'Using MAC address broadcasting'
              ],
              correctOptionIndex: 0,
              explanation: 'Docker Compose sets up an embedded DNS server resolving service names to container bridge IPs.'
            }
          ],
          exercise: {
            id: 'cloudex-3',
            instructions: 'Write Docker Compose command `docker compose up -d` and match text.',
            initialCode: '# Compose command\n',
            solutionCode: 'docker compose up -d',
            hints: ['Use docker compose up -d'],
            validationType: 'text_match',
            testCases: [{ id: 'cloudtc3', description: 'Matches docker compose command', expectedOutput: 'docker compose up -d' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'cloud-les-4',
          slug: 'cloud-kubernetes-objects-manifests',
          title: 'Kubernetes Cluster Architecture: Pods, Deployments & Services',
          description: 'Master Kubernetes master/worker node topology, write declarative YAML manifests for Pods, ReplicaSets, Deployments, and ClusterIP/LoadBalancer Services.',
          estimatedMinutes: 40,
          orderIndex: 2,
          prerequisites: ['cloud-les-3'],
          concepts: [
            {
              id: 'cloudc4_1',
              title: 'Kubernetes Core Abstractions',
              contentMarkdown: `### Kubernetes Object Hierarchy
- **Pod**: Smallest deployable unit containing one or more co-located containers.
- **Deployment**: Declarative controller maintaining desired Pod replica counts and rolling updates.
- **Service**: Stable network abstraction (ClusterIP, NodePort, LoadBalancer) load balancing traffic across Pods.`
            }
          ],
          examples: [
            {
              id: 'cloudex4_1',
              title: 'Example 1: Kubernetes Deployment Manifest YAML',
              code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
      - name: api-container
        image: myregistry/api:v1.2.0
        ports:
        - containerPort: 8080`,
              explanation: 'Declaratively ensures 3 identical running Pod replicas across Kubernetes worker nodes.'
            }
          ],
          quiz: [
            {
              id: 'cloudq4_1',
              question: 'Which Kubernetes object controller manages rolling updates and ensures a specified number of Pod replicas remain running?',
              options: ['Deployment', 'Pod', 'Service', 'Ingress'],
              correctOptionIndex: 0,
              explanation: 'Deployments manage ReplicaSet state and zero-downtime rolling updates.'
            }
          ],
          exercise: {
            id: 'cloudex-4',
            instructions: 'Write kubectl command `kubectl apply -f deployment.yaml` and match text.',
            initialCode: '# Kubectl command\n',
            solutionCode: 'kubectl apply -f deployment.yaml',
            hints: ['Use kubectl apply -f deployment.yaml'],
            validationType: 'text_match',
            testCases: [{ id: 'cloudtc4', description: 'Matches kubectl command', expectedOutput: 'kubectl apply -f deployment.yaml' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'cloud-mod-3',
      slug: 'cloud-terraform-monitoring',
      title: 'Level 3: Infrastructure as Code (Terraform) & Observability',
      description: 'Provision cloud infrastructure declaratively using HashiCorp Terraform HCL, and monitor cluster health with Prometheus metrics & Grafana dashboards.',
      level: 'advanced',
      orderIndex: 3,
      lessons: [
        {
          id: 'cloud-les-5',
          slug: 'cloud-terraform-iac',
          title: 'Infrastructure as Code (IaC) with HashiCorp Terraform',
          description: 'Write Terraform HCL files (main.tf, variables.tf), manage state files (.tfstate), and execute plan/apply resource provisioning cycles.',
          estimatedMinutes: 40,
          orderIndex: 1,
          prerequisites: ['cloud-les-4'],
          concepts: [
            {
              id: 'cloudc5_1',
              title: 'Terraform State & Execution Lifecycle',
              contentMarkdown: `### Terraform Core Commands
1. \`terraform init\`: Initializes provider plugins (AWS, Azure, GCP).
2. \`terraform plan\`: Generates execution plan previewing infrastructure additions/modifications.
3. \`terraform apply\`: Provisions resources and updates remote state file (\`terraform.tfstate\`).`
            }
          ],
          examples: [
            {
              id: 'cloudex5_1',
              title: 'Example 1: Terraform AWS EC2 Instance HCL',
              code: `provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "web_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"

  tags = {
    Name = "Production-Web-Server"
  }
}`,
              explanation: 'Declaratively defines AWS EC2 instance resource configuration.'
            }
          ],
          quiz: [
            {
              id: 'cloudq5_1',
              question: 'Which Terraform command previews planned infrastructure changes without applying them to the cloud provider?',
              options: ['terraform plan', 'terraform apply', 'terraform init', 'terraform destroy'],
              correctOptionIndex: 0,
              explanation: 'terraform plan analyzes state files and generates a preview of proposed infrastructure modifications.'
            }
          ],
          exercise: {
            id: 'cloudex-5',
            instructions: 'Write command `terraform apply -auto-approve` and match text.',
            initialCode: '# Terraform command\n',
            solutionCode: 'terraform apply -auto-approve',
            hints: ['Use terraform apply -auto-approve'],
            validationType: 'text_match',
            testCases: [{ id: 'cloudtc5', description: 'Matches terraform apply command', expectedOutput: 'terraform apply -auto-approve' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'cloud-les-6',
          slug: 'cloud-prometheus-grafana-monitoring',
          title: 'Cloud Monitoring & Observability with Prometheus & Grafana',
          description: 'Collect time-series metrics using Prometheus scraping targets, build Grafana visual monitoring dashboards, and configure Alertmanager thresholds.',
          estimatedMinutes: 40,
          orderIndex: 2,
          prerequisites: ['cloud-les-5'],
          concepts: [
            {
              id: 'cloudc6_1',
              title: 'The Three Pillars of Observability',
              contentMarkdown: `### Observability Pillars
1. **Metrics**: Numeric time-series values aggregated over intervals (CPU %, Memory usage).
2. **Logs**: Structured timestamped event records (\`journalctl\`, JSON stdout).
3. **Traces**: Distributed request propagation paths across microservices (OpenTelemetry).`
            }
          ],
          examples: [
            {
              id: 'cloudex6_1',
              title: 'Example 1: PromQL High CPU Alerting Rule',
              code: `# PromQL query for container CPU utilization exceeding 85%
100 * (node_cpu_seconds_total{mode!="idle"} / node_cpu_seconds_total)`,
              explanation: 'PromQL calculates percentage CPU utilization across server nodes for Prometheus alert triggers.'
            }
          ],
          quiz: [
            {
              id: 'cloudq6_1',
              question: 'Which time-series database tool scrapes HTTP metrics endpoints in cloud-native Kubernetes environments?',
              options: ['Prometheus', 'Grafana', 'Elasticsearch', 'Redis'],
              correctOptionIndex: 0,
              explanation: 'Prometheus pulls time-series metrics from configured application targets via HTTP scraping.'
            }
          ],
          exercise: {
            id: 'cloudex-6',
            instructions: 'Write a snippet outputting `"Prometheus Scrape: 200 OK"` to standard console.log.',
            initialCode: '// Prometheus status\n',
            solutionCode: 'console.log("Prometheus Scrape: 200 OK");',
            hints: ['console.log("Prometheus Scrape: 200 OK");'],
            validationType: 'stdout',
            testCases: [{ id: 'cloudtc6', description: 'Outputs Prometheus status', expectedOutput: 'Prometheus Scrape: 200 OK' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    }
  ]
};
