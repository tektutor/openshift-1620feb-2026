# Day 4

## Lab - Deploying an application into Openshift using source strategy
```
oc delete project jegan
oc new-project jegan

oc new-app --name=hello registry.access.redhat.com/ubi8/openjdk-17~https://github.com/tektutor/spring-ms.git --strategy=source
# Create a public route for the service hello - this helps us access the application from outside the cluster
oc expose svc/hello

# Checking the build config strategy
oc get bc/hello -o yaml
oc get bc/hello -o yaml | grep Strategy
oc logs -f bc/hello

oc get deploy,pods,svc,route
curl http://hello-jegan.apps.ocp4.palmeto.org
```
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/d380edfd-8248-4e13-ad0a-3500da73748a" />
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/c8f0c186-52f0-4d9f-9008-1f1918bcb2e1" />
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/f18b5cd7-3051-4e94-9294-5ece895f0822" />
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/60913709-8461-4b40-ad63-8787c90baad5" />
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/ef19ce3a-9834-48ea-bf06-a7715bd4e4b0" />


## Lab - Creating an user group, add users to group, restrict access to project

Let's login as administrator
```
oc login $(oc whoami --show-server) -u jegan-admin -p admin@123 --insecure-skip-tls-verify=true
```

Create a group called
```
oc adm groups new dev-team
oc get groups
oc describe group dev-team
```

Add users to the group
```
oc adm groups add-users dev-team jegan-dev you-can-add-your-dev-user
```

Create a project
```
oc new-project dev-team-project
oc get projects | grep dev-team
```

Remove default access to project
```
oc adm policy remove-role-from-group view system:authenticated -n dev-team-project
```

Give edit access to dev-team
```
oc adm policy add-role-to-group edit dev-team -n dev-team-project
```

Give view only access to dev-team
```
oc get rolebindings -n dev-team-project
oc adm policy add-role-to-group view dev-team -n dev-team-project
oc get rolebindings -n dev-team-project
```

Give full admin permission to dev-team
```
oc adm policy add-role-to-group admin dev-team -n dev-team-project
```

Login as jegan-dev user
```
oc login $(oc whoami --show-server) -u jegan-dev -p dev@123 --insecure-skip-tls-verify=true
oc get projects
oc project dev-team-project
oc new-app --name=hello https://github.com/tektutor/spring-ms.git --strategy=source
oc get deploy,rs,pods
oc expose deploy/hello --port=8080
oc expose svc/hello
oc get route
curl http://your-route-url
```

## Lab - Configuring certain Openshift nodes for QA, Dev use

Let's list all nodes
```
oc get nodes --show-labels
```

Add a label to mark a node reserved for QA team usage
```
oc label node worker01.ocp4.palmeto.org environment=qa
```

Add a label to mark a node reserved for Dev team usage
```
oc label node worker02.ocp4.palmeto.org environment=dev

```
Verify the nodes marked for QA team's use
```
oc get nodes --show-labels | grep environment=qa
```

Verify the nodes marked for Dev team's use
```
oc get nodes --show-labels | grep environment=dev
```

To prevent non-QA workloads from scheduling on worker01 node
```
oc adm taint nodes worker01.ocp4.palmeto.org qa=only:NoSchedule
oc adm taint nodes worker-qa-02 qa=only:NoSchedule
```

To prevent non-Dev workloads from scheduling on worker02 node
```
oc adm taint nodes worker02.ocp4.palmeto.org dev=only:NoSchedule
```

Add tolerations in QA deployments
```
spec:
  tolerations:
  - key: "qa"
    operator: "Equal"
    value: "only"
    effect: "NoSchedule"
  nodeSelector:
    environment: qa
```

Add tolerations in Dev deployments
```
spec:
  tolerations:
  - key: "dev"
    operator: "Equal"
    value: "only"
    effect: "NoSchedule"
  nodeSelector:
    environment: dev
```

Alternatively, let's use Node affinity
```
affinity:
  nodeAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      nodeSelectorTerms:
      - matchExpressions:
        - key: environment
          operator: In
          values:
          - qa
```

## Lab - Draining a node for maintenance

Prevents new pods getting scheduled in to worker01
```
oc adm cordon worker01.ocp4.palmeto.org
```

Drain the node
```
oc adm drain worker01.ocp4.palmeto.org --ignore-daemonsets --delete-emptydir-data
```

Once you are done with node maintenance
```
oc adm uncordon worker01.ocp4.palmeto.org
```
