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
  '';
}
