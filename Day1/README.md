# Day 1

## Info - Hypervisor Overview
<pre>
- is nothing but virtualization technology
- with virtualization technology, we can run multiple OS within virtual machines on the same laptop/desktop/workstation/server
- i.e many OS can actively run side by side
- there are 2 types of Hypervisors
  
  1. Type 1 (a.k.a Bare Metal Hypervisor)
  - this type of Hypervisor will be installed on the server directly without any OS
  - Hypervisor itself supports a minimal OS 
  - meant to be used by Workstations & Servers
  - examples
    - KVM
    - Microsoft Hyper-V
    - VMWare vSphere/vCenter
  
  2. Type 2 (a.k.a Hosted Hypervisor)
  - can only be installed on top of some Host OS ( Windows, Linux or Mac OS-X )
  - meant to be used by Laptops/Desktops and Workstations
  - examples
    - Oracle VirtualBox ( Windows, Linux & Mac OS-X )
    - VMWare Workstation ( Windows & Linux )
    - VMWare Fusion ( Mac OS-X )
    - Parallels ( Mac OS-X )
</pre>
