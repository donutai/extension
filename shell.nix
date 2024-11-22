{ pkgs ? import <nixpkgs> {}}:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs_22
    pkgs.bun
    pkgs.git
  ];

  shellHook = ''
    # shallow clone
    alias clone = "git clone --depth=1 https://github.com/donutai/extension"

    echo "Installing root-level dependencies..."
    npm install

    echo "Installing Core extension dependencies..."
    pushd core
    export PUPPETEER_SKIP_DOWNLOAD='true'
    npm install
    npm link
    popd

    # temporary workaround for the dependency between gui and extension
    pushd extensions/vscode
    bun install
    bun link @continuedev/core
    popd

    echo "Installing GUI extension dependencies..."
    pushd gui
    npm install
    npm run build
    popd

    # VSCode Extension (will also package GUI)
    echo "Installing VSCode extension dependencies..."
    pushd extensions/vscode
    npm install
    ## FAILING HERE DUE TO NO INTELLIJ FOLDER ANY MORE - TBD!!!
    ## SHOULD WORK NOW..
    npm run prepackage
    npm run package
    popd

    echo "Installing binary dependencies..."
    pushd binary
    npm install
    npm run build

    popd
  '';
}
