---
layout: doc
outline: deep
title: "Linux (Ubuntu) Install"
description: "This page contains instructions for installing the Zond Testnet #BUIDL Preview on Linux."

---


# {{ $frontmatter.title}}

{{ $frontmatter.description}}

::: info
Note: Ubuntu 22.04 is required for running Bazel
:::

Getting started with the Zond testnet Local system

## 1. Installing prerequisites

This requires Docker, brew, yq running in Ubuntu 22.04

### Update & Build-essential

```
sudo apt-get update && sudo apt-get install build-essential
```

### Docker Install

```
sudo snap install docker yq
```

Setting up docker permission for non-root user

```
sudo addgroup docker
```

And reboot the subsystem image

```
reboot
```

After rebooting the subsystem image, add users to the group

```
sudo usermod -aG docker $USER
sudo usermod -aG docker root
```

And update the docker.sock user group

```
sudo chown root:docker /var/run/docker.sock
```

### Install Bazel (Choose the right version from https://github.com/bazelbuild/bazelisk/releases)

```bash
# version 1.25.0 is latest at time of writing; system is linux-amd64
wget https://github.com/bazelbuild/bazelisk/releases/download/v1.25.0/bazelisk-linux-amd64 -O bazelisk
chmod +x bazelisk
sudo mv bazelisk /usr/local/bin/bazel
```

### Install Kurtosis 

```
echo "deb [trusted=yes] https://apt.fury.io/kurtosis-tech/ /" | sudo tee /etc/apt/sources.list.d/kurtosis.list
sudo apt update
sudo apt install kurtosis-cli
```

## 2. Clone the repo & cd into it

```
git clone https://github.com/theQRL/qrysm -b dev && cd qrysm
```

## 3. Running & testing the local Local Private Network

You can easily start and stop the local network by executing the following scripts

To start

```
bash ./scripts/local_testnet/start_local_testnet.sh
```

To stop
```
bash ./scripts/local_testnet/stop_local_testnet.sh
```

To test the private test network (replace the MAPPED_PORT in the following with port that is mapped to 8545 that you see after running previous step which is Step 2. Start the private test network).

```
curl http://127.0.0.1:MAPPED_PORT/ -X POST -H "Content-Type: application/json" --data '{"method":"zond_getBlockByNumber","params":["latest", false],"id":1,"jsonrpc":"2.0"}' | jq -e
```

:::info PRO-Tip:

If you want to easily see what ports are mapped to 8545 you can use this command
```bash
docker ps --format '{{.Ports}}' | grep 8545 | sed 's/0.0.0.0://g'
```
:::

## 4. PreMined Coins or Funding Accounts at Genesis

```
cd qrysm
nano scripts/local_testnet/network_params.yaml
```

In the yaml, under prefunded_accounts:

Add your Zond address with balance and restart the network

Once you restarted your network you can check the balance by the following command, (Replace MAPPED_PORT by the local mapped port for 8545 and YOUR_ADDRESS with the Zond address that you added in previous step)

```
curl -H "Content-Type: application/json" -X POST localhost:MAPPED_PORT --data '{"jsonrpc":"2.0","method":"zond_getBalance","params":["YOUR_ADDRESS", "latest"],"id":1}'
```

## Common issues

### Apparmor security on some cloud providers

If you get an error like this.
```
open /home/ubuntu/qrysm/scripts/local_testnet/../../bazel-bin/cmd/beacon-chain/oci_image_tarball/tarball.tar: permission denied
```

It's likely due to security restrictions that you'll want to selectively open up. To do so open your snap.docker profile.

```
sudo nano /var/lib/snapd/apparmor/profiles/snap.docker.docker
```

And add the line.
```
/home/ubuntu/.cache/bazel/** r,
```

After you edit the file, you'll need to update apparmor.
```
sudo apparmor_parser -r /var/lib/snapd/apparmor/profiles/snap.docker.docker
```

You should then be able to install and run the local network without root privelages.
