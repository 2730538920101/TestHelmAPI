
# Helm Chart: Simple Backend and Frontend App Deployment

This Helm chart facilitates the deployment of a simple backend and frontend application in a Kubernetes cluster. It automates the configuration of necessary resources, ensuring a smooth and reliable setup process.

---

## Features

- **Environment Variable Configuration**: Configure your deployment dynamically using a `.env` file.
- **Automated Deployment Script**: Use the provided `deploy.sh` script for hassle-free deployments.
- **Namespace Isolation**: Deploy your resources in a dedicated namespace for better organization and control.
- **Scalable Services**: Includes backend and frontend services that can scale as needed.

---

## Prerequisites

1. A Kubernetes cluster is up and running.
2. Helm is installed and configured to interact with your cluster.
3. Basic knowledge of Kubernetes and Helm.

---

## Installation Guide

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Create a `.env` File

In the root directory of the chart, create a `.env` file with the following content:

```env
API_SERVER=http://backend-service.helm-test.svc.cluster.local:5000/api
NODE_ENV=production
```

### 3. Add the Deployment Script

Ensure the `deploy.sh` script is in the root directory of the chart. This script automates the deployment process.

### 4. Deploy the Chart

Run the following commands to deploy the chart:

1. Make the script executable:
   ```bash
   chmod +x deploy.sh
   ```

2. Execute the script:
   ```bash
   ./deploy.sh
   ```

---

## Deployment Details

- **Namespace**: Defined in `values.yaml` or passed via `--namespace` during deployment.
- **Environment Variables**: `API_SERVER` and `NODE_ENV` are set dynamically from the `.env` file.

---

## Accessing the Application

### Backend Service

The backend service will be available at the following internal URL within the cluster:
```
http://backend-service.helm-test.svc.cluster.local:5000/api
```

### Frontend Service

1. Retrieve the external IP address:
   ```bash
   kubectl get svc frontend-service -n <namespace>
   ```

2. Open the service in your browser:
   ```bash
   http://<EXTERNAL-IP>
   ```

   Replace `<EXTERNAL-IP>` with the value obtained from the command above.

---

## Troubleshooting

- Verify the `.env` file is correctly configured.
- Ensure the `deploy.sh` script is in the root directory and executable.
- To simulate a deployment without applying changes, run:
  ```bash
  ./deploy.sh --dry-run
  ```
- If issues persist, check the logs of the deployed pods using:
  ```bash
  kubectl logs -n <namespace> <pod-name>
  ```

---

Enjoy deploying your simple backend and frontend app with Helm!
