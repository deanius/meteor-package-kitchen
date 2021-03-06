zipPackage = function () {
  console.log("zipping package");
  var zipContent, zip = new JSZip();

  packageViewModel.allFilesRendered().forEach(function (file) {
    zip.file(file.path, file.contents);
  });

  var base64contents = zip.generate({type:"base64"});
  window.location = "data:application/zip;base64," + base64contents;

  var packageDirName = packageViewModel.fullPackageName().replace(":", "\\:");
  $("#packageCreateShellCode").val(
    "echo -n " + base64contents + " | pbcopy;\n" +
    "mkdir -p packages/" + packageDirName + ";\n" +
    "cd packages/" + packageDirName + ";\n" +
    "pbpaste | base64 -D > tmp.zip;\n" +
    "unzip tmp.zip; rm tmp.zip; cd ../..; \n" +
    "meteor add " + packageViewModel.fullPackageName() + "\n"
  );
}
