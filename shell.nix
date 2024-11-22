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
    bun install

    echo "Installing Core extension dependencies..."
    pushd core
    export PUPPETEER_SKIP_DOWNLOAD='true'
    bun install # this command hangs sometimes, so just abor then re-run
    bun link
    popd

    # temporary workaround for the dependency between gui and extension
    pushd extensions/vscode
    bun install # this command hangs sometimes, so just abor then re-run
    bun link @continuedev/core
    popd

    echo "Installing GUI extension dependencies..."
    pushd gui
    bun install
    bun run build
    popd

    # VSCode Extension (will also package GUI)
    echo "Installing VSCode extension dependencies..."
    pushd extensions/vscode
    # FIXME: prepackaging process has @vscode/rigrep removed since it was not found 
    bun run prepackage
    bun run package
    echo "extension has been built and is now at: extensions/vscode/build/donut-0.01.vsix"
    popd

    echo "Installing binary dependencies..."
    pushd binary
    bun install
    bun run build
    popd
  '';
}
