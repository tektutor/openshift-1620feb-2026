# Day 5

## Lab - Deploying NodeJS Application from Openshift Webconsole
```

```

## Lab - Deploying ReactJS Application from CLI
```
```

## Info - Installing NFS Server in Ubuntu
```
sudo apt install -y nfs-kernel-server
sudo systemctl start nfs-kernel-server.service
sudo apt install -y nfs-common
sudo systemctl restart nfs-kernel-server
sudo systemctl enable nfs-kernel-server
```

## Info - Peristent Volume (PV)
<pre>
- are external Storage Disks provisioned by System Administrators
- PVs can be provisioned either manually or dynamically using storeclass from NFS, AWS, Azure, etc.,
- PV usually will have the below attributes
  - nfs server
  - nfs shared path
  - volumeMode
  - storageclass
  - accessmode - ReadWriteOnce, ReadWriteMany, etc.,
  - storage size
  - any optional labels - to ensure only the requested team is able to claim this storage
</pre>  

## Info - Persistent Volume Claim (PVC)
<pre>
- any application that needs external storage, they must request for storage by creating a PVC
- PVC is created with project scope
- PVC attributes
  - volumeMode
  - accessMode
  - storage size
  - any option label selector - to claim a PV that matches the label
</pre>  

## Let's deploy a multi-pod wordpress application along with db that uses PV and PVCs from NFS server
```
cd ~/openshift-1620feb-2026
git pull
cd Day5/wordpress-with-configmaps-and-secrets
ls
./deploy.sh
oc get pods
oc logs -f 
```
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/e63c398c-1eb3-42a5-9d64-722fef08c9cf" />
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/fa9ae15c-fdc8-4864-8d4f-0eb6103069f6" />
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/3fb79090-a204-496a-a50e-c75731146cb1" />
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/d56e1556-310f-4727-b3b3-d278b3973f0b" />
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/696760f7-0a51-4db2-b3a7-b3ed9380c932" />
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/cf2548e4-ba88-4f35-9460-f5c9f16f4f17" />

## Info - Openshift Network Policy
<pre>
- is essentially Kubernetes NetworkPolicy with some OpenShift-specific integrations
- is the primary mechanism for controlling network traffic between pods (and to/from external endpoints) 
  at L3/L4 level (IP addresses, ports, protocols)
- by default, pods in a namespace can talk freely to each other and to the outside world unless some Network Policy prevents it
- When we create a Network Policy for a particular Project(Namespace), all Pods in that Project(Namespace) 
  are isolated from the ingress(incoming) traffic 
- Only traffic that are allowed by explicit Network policiy are permitted 
- Multiple Policies in the same namespace(project) are combined(ORed together) 
</pre>
